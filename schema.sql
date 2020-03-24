DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE employees (
    id INT(10) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);
CREATE TABLE roles(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    PRIMARY KEY (id) 
);

ALTER TABLE employees
ADD FOREIGN KEY (role_id) REFERENCES roles(id),
ADD FOREIGN KEY (manager_id) REFERENCES employees(id);

ALTER TABLE roles
ADD FOREIGN KEY (department_id) REFERENCES departments(id);

INSERT INTO employees (first_name, last_name)
VALUES ("Jeremiah", "Trotter"),
("Jerome", "Jurenovich"),
("Barkevious", "Mingo"),
("D'Brickashaw", "Ferguson"),
("Gerald", "Gjere");

INSERT INTO departments (name)
VALUES ("Engineering"),
("Custodial Technicians"),
("Human Resources"),
("Middle Management"),
("HMFIC");

INSERT INTO roles (title, salary)
VALUES ("Bossman", 1000000),
("Squeak", 10000),
("Waste of Space", 50000),
("Go getter", 42000);


SELECT * FROM employees;