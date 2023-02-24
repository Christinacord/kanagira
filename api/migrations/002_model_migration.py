steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE boards (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE boards;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE swim_lanes (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            board_id INTEGER REFERENCES boards("id") ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE swim_lanes;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE issues (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            description VARCHAR(500),
            priority INTEGER NOT NULL,
            type VARCHAR(100) NOT NULL,
            difficulty INTEGER NOT NULL,
            creator_id INTEGER REFERENCES accounts("id") ON DELETE CASCADE,
            assignee_id INTEGER REFERENCES accounts("id")
                ON DELETE CASCADE
                NULL,
            swim_lane_id INTEGER REFERENCES swim_lanes("id") ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE issues;
        """,
    ],
]
