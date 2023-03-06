from pydantic import BaseModel
from .pool import pool


class DuplicateBoardError(ValueError):
    pass


class BoardIn(BaseModel):
    name: str


class BoardOut(BaseModel):
    id: int
    name: str


class BoardQueries:
    def get_by_id(self, id: int) -> BoardOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, name
                    FROM boards
                    WHERE id = %s;
                    """,
                    [id],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return BoardOut(id=record[0], name=record[1])

    def get_all_boards(self) -> list[BoardOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, name
                    FROM boards
                    ORDER BY id;
                    """
                )
                records = result.fetchall()
                return [
                    BoardOut(id=record[0], name=record[1])
                    for record in records
                ]

    def create(self, info: BoardIn) -> int:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO boards (name)
                    VALUES (%s)
                    RETURNING id;
                    """,
                    [info.name],
                )
                board_id = result.fetchone()[0]
                db.execute(
                    """
                    INSERT INTO swim_lanes (name, board_id)
                    VALUES (%s, %s),(%s, %s),(%s, %s), (%s, %s),(%s, %s)
                    """,
                    [
                        "Backlog",
                        board_id,
                        "In Progress",
                        board_id,
                        "Review",
                        board_id,
                        "Testing",
                        board_id,
                        "Complete",
                        board_id,
                    ],
                )
                return board_id

    def update(self, board_id: int, info: BoardIn) -> BoardOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    UPDATE boards
                    SET name = %s
                    WHERE id = %s
                    ORDER BY id
                    RETURNING id;
                    """,
                    [info.name, board_id],
                )
                id = result.fetchone()[0]
                return BoardIn(id=id, name=info.name)
