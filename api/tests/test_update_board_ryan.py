from fastapi.testclient import TestClient
from unittest.mock import Mock

from main import app
from queries.boards import BoardIn, BoardOut, BoardQueries


def test_update_board():
    # Arrange
    board_id = 123
    board_in = BoardIn(id=board_id, name="new_board_name")
    board_out = BoardOut(id=board_id, name=board_in.name)
    mock_board_queries = Mock(spec=BoardQueries)
    mock_board_queries.update.return_value = board_out

    # Act
    app.dependency_overrides[BoardQueries] = lambda: mock_board_queries
    client = TestClient(app)
    response = client.put(
        f"/api/boards/{board_id}",
        json={"name": board_in.name},
    )

    # Assert
    assert response.status_code == 200
    assert response.json() == {
        "id": board_out.id,
        "name": board_out.name,
    }
    mock_board_queries.update.assert_called_once_with(board_id, board_in)
