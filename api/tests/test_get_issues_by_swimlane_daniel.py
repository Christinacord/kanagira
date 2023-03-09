from fastapi.testclient import TestClient
from unittest.mock import Mock

from main import app
from queries.issues import IssueOut, IssueQueries
from queries.accounts import AccountQueries
# from authenticator import authenticator
# from queries.swim_lanes import SwimLaneOut, SwimLaneQueries


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
    assert response.json() == [{
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
    }]

    mock_issue_queries.get_issues_by_swim_lane_id.assert_called_once_with(swim_lane_id)










# from fastapi.testclient import TestClient
# from main import app
# from queries.issues import IssueQueries
# from queries.issues import IssueOut
# from authenticator import authenticator


# client = TestClient(app)

# # def fake_get_current_account_data():
# #     return {
# #         'id': 99,
# #         'username': 'fakeuser'
# #     }

# class FakeIssuesQueries:
#     def get_issues_by_swim_lane_id(self, board_id: int, swim_lane_id: int):

#         return {
#             'id': int,
#             'name': str,
#             'description': str,
#             'priority': int,
#             'type': str,
#             'difficulty': int,
#             'creator_id': int,
#             'assignee_id': int | None = None,
#             'swim_lane_id': int,
#             'assignee_name': str | None = None
#         }
#         return {
#             'id': truck_id,
#             'name': 'The truck',
#             'website': 'www.truck.com',
#             'category': 'American',
#             'vegetarian_friendly': True,
#             'owner': {
#                 'id': '1337',
#                 'first': 'Riley',
#                 'last': 'Dallas',
#                 'avatar': 'decent movie',
#                 'email': 'riley.dallas@galvanize.com',
#                 'username': 'riley'
#             }
#         }

# def test_get_issues_by_swimlane():
#     # Arrange
#     app.dependency_overrides[IssueQueries] = FakeIssuesQueries
#     # app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

#     # Act
#     res = client.get('/api/boards/1/swim_lanes/5/issues')
#     data = res.json()

#     # Assert
#     assert res.status_code == 200
#     assert data['id'] == 42
