from pydantic import BaseModel
from .pool import pool


class DuplicateSwimLaneError(ValueError):
    pass


class SwimLaneIn(BaseModel):
    name: str
    board_id: int


class SwimLaneOut(BaseModel):
    id: int
    name: str
    board_id: int


class SwimLaneQueries:
    def get_all_swim_lanes(self, board_id: int) -> list[SwimLaneOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, name, board_id
                    FROM swim_lanes
                    WHERE board_id = %s;
                    """,
                    [board_id]
                )
                records = result.fetchall()
                return [SwimLaneOut(id=record[0], name=record[1], board_id=record[2]) for record in records]

    def create_swim_lane(self, info: SwimLaneIn) -> SwimLaneOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO swim_lanes (name, board_id)
                    VALUES (%s, %s)
                    RETURNING id;
                    """,
                    [info.name, info.board_id]
                )
                id = result.fetchone()[0]
                return SwimLaneOut(id=id, name=info.name, board_id=info.board_id)


    def update_swim_lane(self, info: SwimLaneIn) -> SwimLaneOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO swim_lanes (name, board_id)
                    VALUES (%s, %s)
                    RETURNING id;
                    """,
                    [info.name, info.board_id]
                )
                id = result.fetchone()[0]
                return SwimLaneOut(id=id, name=info.name, board_id=info.board_id)
