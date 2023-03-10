from fastapi.testclient import TestClient
from unittest.mock import Mock

from main import app
from queries.issues import IssueOut, IssueQueries
from queries.accounts import AccountQueries


def test_get_issue_by_id():
    # Arrange
    board_id = 123
    swim_lane_id = 456
    issue_id = 789
    issue_out = IssueOut(
        id=issue_id,
        name="test_issue",
        description="test_description",
        priority=3,
        type="bug",
        difficulty=3,
        creator_id=456,
        assignee_id=789,
        swim_lane_id=swim_lane_id,
        assignee_name="test_assignee",
    )
    mock_issue_queries = Mock(spec=IssueQueries)
    mock_issue_queries.get_issue_by_id.return_value = issue_out
    mock_account_queries = Mock(spec=AccountQueries)
    mock_account_queries.get_by_id.return_value = issue_out.assignee_name

    # Act
    app.dependency_overrides[IssueQueries] = lambda: mock_issue_queries
    app.dependency_overrides[AccountQueries] = lambda: mock_account_queries
    client = TestClient(app)
    response = client.get(
        f"/api/boards/{board_id}/swim_lanes/{swim_lane_id}/issues/{issue_id}"
    )

    # Assert
    assert response.status_code == 200
    assert response.json() == {
        "id": issue_id,
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

    mock_issue_queries.get_issue_by_id.assert_called_once_with(issue_id)
