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

class Account(AccountOut):
    id: int
    full_name: str
    username: str
    email: str
    hashed_password: str

class AccountQueries:

    def get_by_email(self, email: str) -> Account:
        pass

    def create(self, info: AccountIn, hashed_password: str) -> Account:
        #set up connection to database and create cursor to navigate
        with pool.connection() as conn:
            with conn.cursor() as db:
                #create a new account with inputted data
                result = db.execute(
                    """
                    INSERT INTO accounts (full_name, username, email, hashed_password)
                    VALUES (%s, %s, %s, %s)
                    RETURN id;
                    """,
                    [info.full_name, info.username, info.email, hashed_password]
                )
                #fetching id since it is the first entry of the list, as it inserts it will generates id
                id=result.fetchone()[0]
                #return account
                return Account(id=id, full_name=info.full_name, username=info.username, email=info.email, hashed_password=hashed_password)
