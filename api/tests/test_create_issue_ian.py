from fastapi.testclient import TestClient
from unittest.mock import Mock
from main import app
from queries.issues import IssueIn
from queries.issues import IssueQueries
from queries.accounts import AccountQueries


def test_create_issue():
    # Arrange
    board_id = 1
    swim_lane_id = 1

    issue_in = IssueIn(

        name="new_issue_name",
        description="new_issue_description",
        priority=1,
        type="task",
        difficulty=1,
        assignee_id=1,
        swim_lane_id=swim_lane_id,
    )
    mock_issue_queries = Mock(spec=IssueQueries)
    mock_issue_queries.update.return_value = issue_in
    mock_account_queries = Mock(spec=AccountQueries)

    # Act
    app.dependency_overrides[IssueQueries] = lambda: mock_issue_queries
    app.dependency_overrides[AccountQueries] = lambda: mock_account_queries
    client = TestClient(app)
    response = client.post(
        f"/api/boards/{board_id}/swim_lanes/{swim_lane_id}/issues",
        json={
            "name": issue_in.name,
            "description": issue_in.description,
            "priority": issue_in.priority,
            "type": issue_in.type,
            "difficulty": issue_in.difficulty,
            "assignee_id": issue_in.assignee_id,
            "swim_lane_id": issue_in.swim_lane_id,
        },)

    # Assert
    assert response.status_code == 200
    assert response.json() == {
        "name": issue_in.name,
        "description": issue_in.description,
        "priority": issue_in.priority,
        "type": issue_in.type,
        "difficulty": issue_in.difficulty,
        "assignee_id": issue_in.assignee_id,
        "swim_lane_id": issue_in.swim_lane_id,
    }
    mock_issue_queries.update.assert_called_once_with(issue_in)
