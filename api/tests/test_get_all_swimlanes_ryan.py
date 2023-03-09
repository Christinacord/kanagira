from fastapi.testclient import TestClient
from unittest.mock import Mock

from main import app
from queries.swim_lanes import SwimLaneQueries, SwimLaneOut


def test_get_all_swim_lanes():
    # Arrange
    board_id = 123
    swim_lane_out1 = SwimLaneOut(id=1, name="swim_lane1", board_id=board_id)
    swim_lane_out2 = SwimLaneOut(id=2, name="swim_lane2", board_id=board_id)
    mock_repo = Mock(spec=SwimLaneQueries)
    mock_repo.get_all_swim_lanes.return_value = [swim_lane_out1, swim_lane_out2]

    # Act
    app.dependency_overrides[SwimLaneQueries] = lambda: mock_repo
    client = TestClient(app)
    response = client.get(f"/api/boards/{board_id}/swim_lanes")

    # Assert
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": swim_lane_out1.id,
            "name": swim_lane_out1.name,
            "board_id": swim_lane_out1.board_id,
        },
        {
            "id": swim_lane_out2.id,
            "name": swim_lane_out2.name,
            "board_id": swim_lane_out2.board_id,
        },
    ]
    mock_repo.get_all_swim_lanes.assert_called_once_with(board_id)
