from pydantic import BaseModel
from .pool import pool


class DuplicateIssueError(ValueError):
    pass


class IssueIn(BaseModel):
    name: str
    description: str
    priority: int
    type: str
    difficulty: int
    assignee_id: int | None = None


class IssueOut(BaseModel):
    id: int
    name: str
    description: str
    priority: int
    type: str
    difficulty: int
    creator_id: int
    assignee_id: int | None = None
    swim_lane_id: int


class IssueQueries:
    def get_issue_by_id(self, issue_id: int) -> IssueOut:
        with pool.getconn() as conn:
            with conn.cursor() as cursor:
                result = cursor.execute(
                    """
                    SELECT
                    id, name, description, priority, type, difficulty,
                    creator_id, assignee_id, swim_lane_id
                    FROM issues
                    WHERE id = %s
                    ORDER BY id;
                    """,
                    [issue_id],
                )
                record = result.fetchone()
                if record is None:
                    raise ValueError(
                        f"Could not find issue with id {issue_id}"
                    )
                return IssueOut(
                    id=record[0],
                    name=record[1],
                    description=record[2],
                    priority=record[3],
                    type=record[4],
                    difficulty=record[5],
                    creator_id=record[6],
                    assignee_id=record[7],
                    swim_lane_id=record[8],
                )

    # Get Issues by swim_lane_id
    def get_issues_by_swim_lane_id(self, swim_lane_id: int) -> list[IssueOut]:
        with pool.getconn() as conn:
            with conn.cursor() as cursor:
                result = cursor.execute(
                    """
                    SELECT
                    id, name, description, priority, type, difficulty,
                    creator_id, assignee_id, swim_lane_id
                    FROM issues
                    WHERE swim_lane_id = %s
                    ORDER BY id;
                    """,
                    [swim_lane_id],
                )
                records = result.fetchall()
                if records is None:
                    raise ValueError(
                        f"Could not find issues with id {swim_lane_id}"
                    )
                return [
                    IssueOut(
                        id=record[0],
                        name=record[1],
                        description=record[2],
                        priority=record[3],
                        type=record[4],
                        difficulty=record[5],
                        creator_id=record[6],
                        assignee_id=record[7],
                        swim_lane_id=record[8],
                    )
                    for record in records
                ]

    # Get Issues by assignee_id
    def get_issues_by_assignee_id(self, assignee_id: int) -> list[IssueOut]:
        with pool.getconn() as conn:
            with conn.cursor() as cursor:
                result = cursor.execute(
                    """
                    SELECT
                    id, name, description, priority, type, difficulty,
                    creator_id, assignee_id, swim_lane_id
                    FROM issues
                    WHERE assignee_id = %s
                    ORDER BY id;
                    """,
                    [assignee_id],
                )
                records = result.fetchall()
                if records is None:
                    raise ValueError(
                        f"Could not find issues with assignee id {assignee_id}"
                    )
                return [
                    IssueOut(
                        id=record[0],
                        name=record[1],
                        description=record[2],
                        priority=record[3],
                        type=record[4],
                        difficulty=record[5],
                        creator_id=record[6],
                        assignee_id=record[7],
                        swim_lane_id=record[8],
                    )
                    for record in records
                ]

    # Create issue
    # Get id of currently logged in user
    # Get id of the swim lane
    # Create the issue and assign the currently logged in user as the creator
    def create(
        self, info: IssueIn, creator_id: int, swim_lane_id: int
    ) -> IssueOut:
        with pool.getconn() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO issues
                    (name, description, priority, type, difficulty,
                    creator_id, assignee_id, swim_lane_id)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    (
                        info.name,
                        info.description,
                        info.priority,
                        info.type,
                        info.difficulty,
                        creator_id,
                        None,
                        swim_lane_id,
                    ),
                )
                id = cursor.fetchone()[0]
                return IssueOut(
                    id=id,
                    name=info.name,
                    description=info.description,
                    priority=info.priority,
                    type=info.type,
                    difficulty=info.difficulty,
                    creator_id=creator_id,
                    swim_lane_id=swim_lane_id,
                )

    def update(self, issue_id, info: IssueIn) -> IssueOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    UPDATE issues
                    SET name = %s,
                        description = %s,
                        priority = %s,
                        type = %s,
                        difficulty = %s,
                        assignee_id = %s
                    WHERE id = %s
                    RETURNING id;
                    """,
                    [
                        info.name,
                        info.description,
                        info.priority,
                        info.type,
                        info.difficulty,
                        info.assignee_id,
                        issue_id,
                    ],
                )
                id = result.fetchone()[0]
                return IssueIn(
                    id=id,
                    name=info.name,
                    description=info.description,
                    priority=info.priority,
                    type=info.type,
                    difficulty=info.difficulty,
                    assignee_id=info.assignee_id,
                )
