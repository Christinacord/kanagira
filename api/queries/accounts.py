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
                        SELECT (id, full_name, username, email, hashed_password)
                        FROM accounts
                        WHERE id = %s;
                        """,
                        [username]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.account(record)

    #cleaner separating params and query
    def create(self, info: AccountIn, hashed_password: str) -> Account:
        query = """
            INSERT INTO accounts (full_name, username, email, hashed_password)
            VALUES (%(full_name)s, %(username)s, %(email)s, %(hashed_password)s)
            RETURNING id;
        """
        params = {
            'full_name': info.full_name,
            'username': info.username,
            'email': info.email,
            'hashed_password': hashed_password
        }
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                try:
                    cursor.execute(query, params)
                    id = cursor.fetchone()[0]
                    return Account(id=id, full_name=info.full_name, username=info.username, email=info.email, hashed_password=hashed_password)
                except psycopg.errors.UniqueViolation as e:
                    raise DuplicateAccountError("Username or email already exists")
                except Exception as e:
                    raise e

    # VIA LEARN METHOD
    # def create(self, info: AccountIn, hashed_password: str) -> Account:
    #     #set up connection to database and create cursor to navigate
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             #create a new account with inputted data
    #             result = db.execute(
    #                 """
    #                 INSERT INTO accounts (full_name, username, email, hashed_password)
    #                 VALUES (%s, %s, %s, %s)
    #                 RETURN id;
    #                 """,
    #                 [info.full_name, info.username, info.email, hashed_password]
    #             )
    #             #fetching id since it is the first entry of the list, as it inserts it will generates id
    #             id=result.fetchone()[0]
    #             #return account
    #             return Account(id=id, full_name=info.full_name, username=info.username, email=info.email, hashed_password=hashed_password)


    def delete(self, account_id: int) -> None:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    #create a new account with inputted data
                    result = db.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s;
                        """,
                    [account_id]
                    )
                    return True
        except Exception as e:
            return False
