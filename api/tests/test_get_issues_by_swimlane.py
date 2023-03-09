from fastapi.testclient import TestClient
from main import app
from queries.issues import IssueQueries
from queries.issues import IssueOut
from authenticator import authenticator


client = TestClient(app)

# def fake_get_current_account_data():
#     return {
#         'id': 99,
#         'username': 'fakeuser'
#     }

class FakeIssuesQueries:
    def get_issues_by_swim_lane_id(self, board_id: int, swim_lane_id: int):

        return {
            'id': int,
            'name': str,
            'description': str,
            'priority': int,
            'type': str,
            'difficulty': int,
            'creator_id': int,
            'assignee_id': int | None = None,
            'swim_lane_id': int,
            'assignee_name': str | None = None
        }
        return {
            'id': truck_id,
            'name': 'The truck',
            'website': 'www.truck.com',
            'category': 'American',
            'vegetarian_friendly': True,
            'owner': {
                'id': '1337',
                'first': 'Riley',
                'last': 'Dallas',
                'avatar': 'decent movie',
                'email': 'riley.dallas@galvanize.com',
                'username': 'riley'
            }
        }

def test_get_issues_by_swimlane():
    # Arrange
    app.dependency_overrides[IssueQueries] = FakeIssuesQueries
    # app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    # Act
    res = client.get('/api/boards/1/swim_lanes/5/issues')
    data = res.json()

    # Assert
    assert res.status_code == 200
    assert data['id'] == 42
