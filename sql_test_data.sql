/* create table */
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(12) NOT NULL,
    age int NOT NULL
);


/* insert data */
INSERT INTO users (name, age)
    VALUES ('ragnarokat', 39);

INSERT INTO users (name, age)
    VALUES ('bowei', 42);

INSERT INTO users (name, age)
    VALUES ('bo', 76);

