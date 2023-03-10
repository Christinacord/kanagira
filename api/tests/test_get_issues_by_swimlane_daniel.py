from fastapi.testclient import TestClient
from unittest.mock import Mock

from main import app
from queries.issues import IssueOut, IssueQueries
from queries.accounts import AccountQueries


def test_get_issues_by_swim_lane_id():
    # Arrange
    board_id = 10
    swim_lane_id = 11
    issue_out = IssueOut(
        id=12,
        name="test_issue_by_swimlane_name",
        description="test_issue_by_swimlane_description",
        priority=1,
        type="feature",
        difficulty=1,
        creator_id=1001,
        assignee_id=1010,
        swim_lane_id=swim_lane_id,
        assignee_name="test_assignee_name",
    )
    mock_issue_queries = Mock(spec=IssueQueries)
    mock_issue_queries.get_issues_by_swim_lane_id.return_value = [issue_out]
    mock_account_queries = Mock(spec=AccountQueries)
    mock_account_queries.get_by_id.return_value = issue_out.assignee_name

    # Act
    app.dependency_overrides[IssueQueries] = lambda: mock_issue_queries
    app.dependency_overrides[AccountQueries] = lambda: mock_account_queries
    client = TestClient(app)
    response = client.get(
        f"/api/boards/{board_id}/swim_lanes/{swim_lane_id}/issues"
    )

    # Assert
    assert response.status_code == 200
    assert response.json() == [
        {
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
    ]

    mock_issue_queries.get_issues_by_swim_lane_id.assert_called_once_with(
        swim_lane_id
    )
