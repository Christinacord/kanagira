steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            full_name VARCHAR(100) NOT NULL,
            username VARCHAR(30) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            hashed_password VARCHAR(255) NOT NULL,
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ],
]
