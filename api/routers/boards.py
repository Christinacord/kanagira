from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)
from typing import Optional
from authenticator import authenticator
from pydantic import BaseModel

from queries.boards import DuplicateBoardError, BoardIn, BoardOut, BoardQueries


class BoardForm(BaseModel):
    name: str


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/boards/{id}")
async def get_board(id: int, repo: BoardQueries = Depends()):
    account_data: Optional[dict] = (
        Depends(authenticator.try_get_current_account_data),
    )
    if account_data:
        board = repo.get_by_id(id)
        if board is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Board not found"
            )
        return board


@router.get("/api/boards", response_model=list[BoardOut])
async def get_boards(repo: BoardQueries = Depends()):
    account_data: Optional[dict] = (
        Depends(authenticator.try_get_current_account_data),
    )
    if account_data:
        return repo.get_all_boards()


@router.post("/api/boards")
async def create_board(
    info: BoardIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: BoardQueries = Depends(),
):
    try:
        board_id = repo.create(info)
    except DuplicateBoardError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Board with that name already exists",
        )
    return {"board_id": board_id}


@router.put("/api/boards/{board_id}")
async def update_board(
    board_id: int,
    info: BoardIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: BoardQueries = Depends(),
):
    try:
        board = repo.update(board_id, info)
    except DuplicateBoardError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Board with that name already exists",
        )
    return board
