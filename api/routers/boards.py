from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)

from pydantic import BaseModel

from queries.boards import (
    DuplicateBoardError,
    BoardIn,
    BoardOut,
    BoardQueries
)


class BoardForm(BaseModel):
    name: str


class HttpError(BaseModel):
    detail: str


router = APIRouter()


# Get one Board by ID
@router.get("/api/boards/{id}")
async def get_board(id: int, repo: BoardQueries = Depends()):
    board = repo.get_by_id(id)
    if board is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Board not found")
    return board


# Get all Boards
@router.get("/api/boards", response_model=list[BoardOut])
async def get_boards(repo: BoardQueries = Depends()):
    return repo.get_all_boards()


# Create a Board
@router.post("/api/boards")
async def create_board(info: BoardIn, repo: BoardQueries = Depends()):
    try:
        board = repo.create(info)
    except DuplicateBoardError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Board with that name already exists",
        )
    return board


# Update a Board
@router.put("/api/boards/{board_id}")
async def update_board(board_id: int, info: BoardIn, repo: BoardQueries = Depends()):
    try:
        board = repo.update(info)
    except DuplicateBoardError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Board with that name already exists",
        )
    return board
