steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE boards (
            id SERIAL PRIMARY KEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE boards;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE swim_lanes (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            FOREIGN KEY (board_id) REFERENCES boards(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE swim_lanes;
        """
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
            FOREIGN KEY (creator_id) REFERENCES accounts(id)
            FOREIGN KEY (assignee_id) REFERENCES accounts(id)
            FOREIGN KEY (swim_lane_id) REFERENCES swim_lanes(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE issues;
        """
    ]
]
