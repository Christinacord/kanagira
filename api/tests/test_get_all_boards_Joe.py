from fastapi.testclient import TestClient
from unittest.mock import Mock
from main import app
from queries.boards import BoardQueries, BoardOut

def test_get_all_boards():
    # Arrange
    board_out1 = BoardOut(id=1, name="board1")
    board_out2 = BoardOut(id=2, name="board2")
    mock_repo = Mock(spec=BoardQueries)
    mock_repo.get_all_boards.return_value = [board_out1, board_out2]

    # Act
    app.dependency_overrides[BoardQueries] = lambda: mock_repo
    client = TestClient(app)
    response = client.get("/api/boards")

    # Assert
    assert response.status_code == 200
    assert response.json() == [
        {"id": board_out1.id, "name": board_out1.name},
        {"id": board_out2.id, "name": board_out2.name},
    ]
    mock_repo.get_all_boards.assert_called_once()
