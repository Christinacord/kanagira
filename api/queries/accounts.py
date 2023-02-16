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
    def get_by_username(self, username: str) -> Account:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    SELECT id, full_name, username, email, hashed_password
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username]
                )
                record = result.fetchone()
                print(record)
                if record is None:
                    return None
                return Account(id=record[0], full_name=record[1], username=record[2], email=record[3], hashed_password=record[4])

    def create(self, info: AccountIn, hashed_password: str) -> Account:
        # set up connection to database and create cursor to navigate
        with pool.connection() as conn:
            with conn.cursor() as db:
                print(f"Inserting values into accounts table: {info.full_name}, {info.username}, {info.email}, {hashed_password}")
                # create a new account with inputted data
                result = db.execute(
                    """
                    INSERT INTO accounts (full_name, username, email, hashed_password)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [info.full_name, info.username, info.email, hashed_password]
                )
                # fetching id since it is the first entry of the list, as it inserts it will generates id
                id = result.fetchone()[0]
                # return account
                return Account(id=id, full_name=info.full_name, username=info.username, email=info.email, hashed_password=hashed_password)

    def delete(self, account_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s;
                        """,
                    [account_id]
                    )
                    return True
        except Exception as e:
            return False
