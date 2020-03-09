DROP DATABASE IF EXISTS employee_tracker;
CREATE database employee_tracker;

USE employee_tracker;

CREATE TABLE employees(
    id TINYINT AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role_id TINYINT NOT NULL,
    manager_id TINYINT,
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES Persons(PersonID)
    FOREIGN KEY (manager_id) REFERENCES employee_role (id)
);

CREATE TABLE department(
    id TINYINT AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee_role(
    id TINYINT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    salary INT NOT NULL,
    department_id TINYINT,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);


SELECT first_name,last_name 
FROM employees 
employees INNER JOIN employee_role ON employees.role_id = employee_role.id


INSERT INTO department (department_name)
VALUES("Sales");

INSERT INTO department (department_name)
VALUES("Accounting");

INSERT INTO department (department_name)
VALUES("Finance");

INSERT INTO department (department_name)
VALUES("Legal");

INSERT INTO department (department_name)
VALUES("Engineering");

INSERT INTO employees (first_name,last_name,role_id)
VALUES("Tim","Duncan","0");

INSERT INTO employees (first_name,last_name,role_id)
VALUES("Paul","Pierce","1");

INSERT INTO employees (first_name,last_name,role_id)
VALUES("Ray","Allen","2");

INSERT INTO employees (first_name,last_name,role_id)
VALUES("Kemba","Walker","3");

INSERT INTO employees (first_name,last_name,role_id)
VALUES("Lebron","James","4");

INSERT INTO employee_role (title,salary,department_id)
VALUES("Sales Lead","80000","1");

INSERT INTO employee_role (title,salary,department_id)
VALUES("Salesperson","60000","2");

INSERT INTO employee_role (title,salary,department_id)
VALUES("Lead Engineer","120000","3");

INSERT INTO employee_role (title,salary,department_id)
VALUES("Software Engineer","80000","4");

INSERT INTO employee_role (title,salary,department_id)
VALUES("Accountant","65000","5");