from fastapi.testclient import TestClient
from unittest.mock import Mock

from main import app
from queries.boards import BoardQueries
from queries.boards import BoardOut


def test_get_board_by_id():
    # Arrange
    board_id = 123
    board_name = "test_board"
    board_out = BoardOut(id=board_id, name=board_name)
    mock_repo = Mock(spec=BoardQueries)
    mock_repo.get_by_id.return_value = board_out

    # Act
    app.dependency_overrides[BoardQueries] = lambda: mock_repo
    client = TestClient(app)
    response = client.get(f"/api/boards/{board_id}")

    # Assert
    assert response.status_code == 200
    assert response.json() == {"id": board_id, "name": board_name}
    mock_repo.get_by_id.assert_called_once_with(board_id)
