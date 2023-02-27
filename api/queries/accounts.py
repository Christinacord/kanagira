from pydantic import BaseModel
from .pool import pool


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    full_name: str
    username: str
    email: str
    password: str


class AccountOut(BaseModel):
    id: int
    full_name: str
    username: str


class Account(BaseModel):
    id: int
    full_name: str
    username: str
    email: str
    hashed_password: str


class AccountQueries:
    def get_all_accounts(self) -> list[AccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, full_name, username
                    FROM accounts
                    ORDER BY id;
                    """
                )
                records = result.fetchall()
                return [
                    AccountOut(id=record[0],
                               full_name=record[1],
                               username=record[2])
                    for record in records
                ]

    def get_by_username(self, username: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, full_name, username, email, hashed_password
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return Account(
                    id=record[0],
                    full_name=record[1],
                    username=record[2],
                    email=record[3],
                    hashed_password=record[4],
                )

    def create(self, info: AccountIn, hashed_password: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts
                    (full_name, username, email, hashed_password)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.full_name,
                        info.username,
                        info.email,
                        hashed_password,
                    ],
                )
                id = result.fetchone()[0]
                return Account(
                    id=id,
                    full_name=info.full_name,
                    username=info.username,
                    email=info.email,
                    hashed_password=hashed_password,
                )

    def delete(self, account_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s;
                        """,
                        [account_id],
                    )
                    return True
        except Exception as e:
            return e
