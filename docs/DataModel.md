# Data Models

### Accounts

| Name            | Type | Not Null | Primary Key | Unique |
| --------------- | ---- | -------- | ----------- | ------ |
| id              | Int  | True     | Yes         | True   |
| full_name       | Str  | True     | No          | False  |
| username        | Str  | True     | No          | True   |
| email           | Str  | True     | No          | True   |
| hashed_password | Str  | True     | No          | False  |

### Boards

| Name | Type | Not Null | Primary Key | Unique |
| ---- | ---- | -------- | ----------- | ------ |
| id   | Int  | True     | Yes         | True   |
| name | Str  | True     | No          | False  |

### Swim Lanes

| Name     | Type | Not Null | Primary Key | Unique |
| -------- | ---- | -------- | ----------- | ------ |
| id       | Int  | True     | Yes         | True   |
| name     | Str  | True     | No          | False  |
| board_id | Int  | True     | No          | False  |

### Issues

| Name         | Type | Not Null | Primary Key | Unique |
| ------------ | ---- | -------- | ----------- | ------ |
| id           | Int  | True     | Yes         | True   |
| name         | Str  | True     | No          | False  |
| description  | Str  | False    | No          | False  |
| priority     | Int  | True     | No          | False  |
| type         | Str  | True     | No          | False  |
| difficulty   | Int  | True     | No          | False  |
| creator_id   | Int  | True     | No          | False  |
| assignee_id  | Int  | False    | No          | False  |
| swim_lane_id | Int  | True     | No          | False  |
