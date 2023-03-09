from fastapi.testclient import TestClient
from unittest.mock import Mock

from main import app
from queries.boards import BoardQueries
from queries.boards import BoardIn


def test_create_board():
    # Arrange
    board_name = "test_board"
    info = BoardIn(name=board_name)
    mock_repo = Mock(spec=BoardQueries)
    mock_repo.create.return_value = 123

    # Act
    app.dependency_overrides[BoardQueries] = lambda: mock_repo
    client = TestClient(app)
    response = client.post("/api/boards", json={"name": board_name})

    # Assert
    assert response.status_code == 200
    assert response.json() == {"board_id": 123}

    mock_repo.create.assert_called_once_with(info)
