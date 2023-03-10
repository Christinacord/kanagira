# Kanagira
**An agile board build for all kinds of business!**

*Designed and created by*
* Ryan Paschen
* Christina Cord
* Daniel Im
* Joe Biedermann
* Ian Li


## Intended Market

Kanagira was developed with businesses in mind. It was designed as an internal tool that could be scaled for use across an entire business. Allowing for multiple boards to be created, a multitude of teams can work without interfering with each other.

## Design

- Link 1
- Link 2
- Link 3

## Functionality of MVP
- Visitors can register an account using their full name, username, email and password
- Users can create a board or an existing one
  - When a board is created, 5 swim lanes are automatically populated
- A board member can create an issue
  - Issue creation has a few main parts:
    - Name
    - Description
    - Priority (1-5)
    - Type
    - Difficulty (1-5)
- After creation, any user can assign the issue to another person
- Issues are also easily editable by simply clicking the view button on one and then clicking the field you want to edit
- Issues can also easily be moved across swimlanes with a simple click of a button moving it left or right
- Visitors who have issues assigned to them can easily view them by visiting the "My issues" page to see what issues they have currently assigned to them without having to sort through various boards they might be apart of


## Installation
1. Clone the repository

2. CD into ```../Kanagira```

3. Run ```docker volume create postgres-data```

4. Run ```docker compose build```

5. Run ```docker compose up```

6. Run ```docker exec -it kanagira-fastapi-1 bash```

7. Run ```python -m migrations up```

8. Exit the container's CLI

9. Visit [here](http://localhost:3000) and have fun with your agile development :)

## Feature Roadmap
* Implement a User management page
* Allow for boards and swim lanes to be editable
* Implement notifications for when you've been assigned an issue
* Make boards specific to users and implement teams

## Run Tests
6. Run ```docker exec -it kanagira-fastapi-1 bash```
7. Run ```python -m pytest```