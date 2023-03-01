from pydantic import BaseModel
from .pool import pool


class DuplicateSwimLaneError(ValueError):
    pass


class SwimLaneIn(BaseModel):
    name: str


class SwimLaneOut(BaseModel):
    id: int
    name: str
    board_id: int


class SwimLaneQueries:
    def get_all_swim_lanes(self, board_id: int) -> list[SwimLaneOut]:
        conn = None
        try:
            conn = pool.getconn()
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, name, board_id
                    FROM swim_lanes
                    WHERE board_id = %s
                    ORDER BY id;
                    """,
                    [board_id],
                )
                records = result.fetchall()
                return [
                    SwimLaneOut(
                        id=record[0], name=record[1], board_id=record[2]
                    )
                    for record in records
                ]
        finally:
            if conn is not None:
                pool.putconn(conn)

    def create_swim_lane(self, board_id: int, info: SwimLaneIn) -> SwimLaneOut:
        conn = None
        try:
            conn = pool.getconn()
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO swim_lanes (name, board_id)
                    VALUES (%s, %s)
                    RETURNING id;
                    """,
                    [info.name, board_id],
                )
                id = result.fetchone()[0]
                return SwimLaneOut(id=id, name=info.name, board_id=board_id)
        finally:
            if conn is not None:
                pool.putconn(conn)

    def update_swim_lane(
        self, board_id: int, swim_lane_id: int, info: SwimLaneIn
    ) -> SwimLaneOut:
        conn = None
        try:
            conn = pool.getconn()
            with conn.cursor() as db:
                result = db.execute(
                    """
                    UPDATE swim_lanes
                    SET name = %s
                    WHERE id = %s
                    RETURNING id;
                    """,
                    [info.name, swim_lane_id],
                )
                id = result.fetchone()[0]
                return SwimLaneOut(
                    id=id,
                    name=info.name,
                    board_id=board_id,
                    swim_lane_id=swim_lane_id,
                )
        finally:
            if conn is not None:
                pool.putconn(conn)
