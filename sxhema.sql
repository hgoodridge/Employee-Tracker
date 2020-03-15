DROP DATABASE IF EXISTS employee_tracker;
CREATE database employee_tracker;

USE employee_tracker;

CREATE TABLE employees(
    id TINYINT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id TINYINT NOT NULL,
    manager_id TINYINT,
    PRIMARY KEY(id)
);

CREATE TABLE department(
    id TINYINT AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee_role(
    id TINYINT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id TINYINT,
    PRIMARY KEY(id)
);

