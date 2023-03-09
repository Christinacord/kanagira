from fastapi.testclient import TestClient
from unittest.mock import Mock

from main import app
from queries.issues import IssueIn, IssueOut, IssueQueries


def test_update_issue():
    # Arrange
    board_id = 123
    swim_lane_id = 456
    issue_id = 789
    issue_in = IssueIn(
        id=issue_id,
        name="new_issue_name",
        description="new_issue_description",
        priority=1,
        type="task",
        difficulty=2,
        assignee_id=123,
        swim_lane_id=swim_lane_id,
    )
    issue_out = IssueOut(
        id=issue_id,
        name=issue_in.name,
        description=issue_in.description,
        priority=issue_in.priority,
        type=issue_in.type,
        difficulty=issue_in.difficulty,
        creator_id=456,
        assignee_id=issue_in.assignee_id,
        swim_lane_id=issue_in.swim_lane_id,
        assignee_name="test_assignee",
    )
    mock_issue_queries = Mock(spec=IssueQueries)
    mock_issue_queries.update.return_value = issue_out

    # Act
    app.dependency_overrides[IssueQueries] = lambda: mock_issue_queries
    client = TestClient(app)
    response = client.put(
        f"/api/boards/{board_id}/swim_lanes/{swim_lane_id}/issues/{issue_id}",
        json={
            "name": issue_in.name,
            "description": issue_in.description,
            "priority": issue_in.priority,
            "type": issue_in.type,
            "difficulty": issue_in.difficulty,
            "assignee_id": issue_in.assignee_id,
            "swim_lane_id": issue_in.swim_lane_id,
        },
    )

    # Assert
    assert response.status_code == 200
    assert response.json() == {
        "id": issue_out.id,
        "name": issue_out.name,
        "description": issue_out.description,
        "priority": issue_out.priority,
        "type": issue_out.type,
        "difficulty": issue_out.difficulty,
        "creator_id": issue_out.creator_id,
        "assignee_id": issue_out.assignee_id,
        "swim_lane_id": issue_out.swim_lane_id,
        "assignee_name": issue_out.assignee_name,
    }
    mock_issue_queries.update.assert_called_once_with(issue_id, issue_in)
