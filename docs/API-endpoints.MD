## API Documentation

### Sign up

- Endpoint path: /users/
- Endpoint method: POST

- Request shape (form):

  ```json
  {
    "account": {
      "full_name": string,
      "username": string,
      "email": string,
      "password": string,
      "password_confirmation": string
    },

  }
  ```

- Response: Account information and a token
- Response shape (JSON):
  ```json
  {
    "account": {
      "full_name": string
    },
    "token": string
  }
  ```

### Log in

- Endpoint path: /token/
- Endpoint method: POST

- Request shape (form):

  ```json
  {
    "account": {
      "username": string,
      "password": string,
    },

  }
  ```

- Response: Account information and a token
- Response shape (JSON):
  ```json
  {
    "account": {
      "full_name": string
    },
    "token": string
  }
  ```

### Log out

- Endpoint path: /token/
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true
  ```

### Create a new Board

- Endpoint path: /boards/
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request body:

  ```json
  {
    "name": string
  }
  ```

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Update a Board

- Endpoint path: /boards/id/
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request body:

  ```json
  {
    "name": string
  }
  ```

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "name": string,
    "success": boolean,
    "message": string
  }
  ```

### Delete a Board

- Endpoint path: /boards/id/
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Create a new Swim Lane

- Endpoint path: /swimlane/
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request body:

  ```json
  {
    "name": string,
  }
  ```

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Update Swim Lane

- Endpoint path: /swimlane/id/
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request body:

  ```json
  {
    "name": string,
    "position": integer
  }
  ```

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "name": string,
    "position": integer,
    "id": integer,
    "board_id": integer
  }
  ```

### Delete Swim Lane

- Endpoint path: /swimlane/id/
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean
  }
  ```

### Get User

- Endpoint path: /token
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "full_name": string,
    "email": string
  }
  ```

### Get Boards

- Endpoint path: /boards
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Get Board

- Endpoint path: /boards/id/
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Get Issue

- Endpoint path: /boards/id/swimlanes/id/issues/id/
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Get Issues

- Endpoint path: /boards/id/swimlanes/id/issues/
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Get Swim Lanes

- Endpoint path: /boards/id/swimlanes/
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Create a new Issue

- Endpoint path: /boards/id/swimlanes/id/issues/
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request body:

  ```json
  {
    "description": string,
    "creator": user,
    "assignee": user,
    "priority": integer,
    "type": string,
    "difficulty": integer,
    "due_date": integer,
  }
  ```

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Update an Issue

- Endpoint path: /boards/id/swimlanes/id/issues/id/
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request body:

  ```json
  {
    "description": string,
    "assignee": user,
    "priority": integer,
    "type": string,
    "difficulty": integer,
    "due_date": integer,
  }
  ```

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Delete an Issue

- Endpoint path: /boards/id/swimlanes/id/issues/id/
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```
