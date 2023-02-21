from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)
from typing import Optional
from authenticator import authenticator
from pydantic import BaseModel

from queries.issues import (
    DuplicateIssueError,
    IssueIn,
    IssueOut,
    IssueQueries
)


class IssueForm(BaseModel):
    name: str
    description: str
    priority: int
    type: str
    difficulty: int


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/boards/{board_id}/swim_lanes/{swim_lane_id}/issues/{issue_id}")
async def get_issue_by_id(board_id: int, swim_lane_id: int, issue_id: int, repo: IssueQueries = Depends()):
    issue = repo.get_issue_by_id(issue_id)
    if issue is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Issue not found")
    return issue


@router.get("/api/boards/{board_id}/swim_lanes/{swim_lane_id}/issues/")
async def get_issues_by_swim_lane_id(board_id: int, swim_lane_id: int, repo: IssueQueries = Depends()):
    issue = repo.get_issues_by_swim_lane_id(swim_lane_id)
    if issue is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Issue not found")
    return issue


@router.get("/api/issues/me")
async def get_issues_by_assignee_id(account_data: dict = Depends(authenticator.get_current_account_data), repo: IssueQueries = Depends()):
    assignee_id = account_data["id"]
    print("*******", assignee_id)
    issue = repo.get_issues_by_assignee_id(assignee_id)
    if issue is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Issue not found")
    return issue


@router.post("/api/boards/{board_id}/swim_lanes/{swim_lane_id}/issues")
async def create_issue(board_id: int, swim_lane_id: int, info: IssueIn, account_data: dict = Depends(authenticator.get_current_account_data), repo: IssueQueries = Depends()):
    creator_id = account_data["id"]
    try:
        issue = repo.create(info, creator_id, swim_lane_id)
    except DuplicateIssueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Issue with that name already exists",
        )
    return issue


# Update an Issue
@router.put("/api/boards/{board_id}/swim_lanes/{swim_lane_id}/issues/{issue_id}")
async def update_issue(board_id: int, swim_lane_id: int, info: IssueIn, issue_id: int, repo: IssueQueries = Depends()):
    try:
        issue = repo.update(info)
    except DuplicateIssueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Issue with that name already exists",
        )
    return issue
