from pydantic import BaseModel


class DuplicateAccountError(ValueError):
    pass


# class Account(BaseModel):
#     id: int
#     username: str
#     email: str
#     hashed_password: str

class AccountIn(BaseModel):
    username: str
    password: str
    email: str
    hashed_password: str

class AccountOut(BaseModel):
    id: int
    username: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountQueries(Queries):
    # region properties-

    def get(self, email: str) -> AccountOutWithPassword:pass
    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:pass
