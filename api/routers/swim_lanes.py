from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)

from pydantic import BaseModel

from queries.swim_lanes import (
    DuplicateSwimLaneError,
    SwimLaneIn,
    SwimLaneOut,
    SwimLaneQueries
)


class SwimLaneForm(BaseModel):
    name: str
    board_id: int


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/boards/{board_id}/swim_lanes", response_model=list[SwimLaneOut])
async def get_swim_lanes(board_id: int, repo: SwimLaneQueries = Depends()):
    return repo.get_all_swim_lanes(board_id)


@router.post("/api/boards/{board_id}/swim_lanes")
async def create_swim_lane(board_id: int, info: SwimLaneIn, repo: SwimLaneQueries = Depends()):
    try:
        swim_lane = repo.create_swim_lane(board_id, info)
    except DuplicateSwimLaneError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="SwimLane with that name already exists",
        )
    return swim_lane


@router.put("/api/boards/{board_id}/swim_lanes/{swim_lane_id}")
async def update_swim_lane(board_id: int, swim_lane_id: int, info: SwimLaneIn, repo: SwimLaneQueries = Depends()):
    try:
        swim_lane = repo.update_swim_lane(board_id, swim_lane_id, info)
    except DuplicateSwimLaneError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="SwimLane with that name already exists",
        )
    return swim_lane
