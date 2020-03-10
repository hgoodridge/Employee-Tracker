const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employee_tracker"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
})

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "start",
            choices: [
                "view all employees",
                "remove employee",
                "add employee",
                "update employee role",
                "add department",
                "view departments",
                "view roles",
                
            ]

        }
    ])
        .then(function (answers) {

            if (answers.start === "view all employees") {
                viewEmployees();
            } else if (answers.start === "remove employee") {
                removeEmployee();
            } else if (answers.start === "add employee") {
                addEmployee();
            } else if (answers.start === "update employee role") {
                updateRole();
            }else if(answers.start === "add department"){
                addDepartment();
            }else if(answers.start === "view departments"){
                viewDepartments();
            }else if(answers.start === "view roles"){
                viewRoles();
            };
        })
}

function viewEmployees() {
    const query = connection.query(
        `SELECT employees.id,first_name,last_name,title,department_name,salary
        FROM employees 
        INNER JOIN employee_role ON employees.role_id = employee_role.id
        INNER JOIN department ON department.id = employee_role.department_id`,

        function (err, results) {
            if (err) throw err;
            console.table(results)
            start()
        })
}

function removeEmployee() {

    const query = connection.query(
        `SELECT employees.id,first_name, last_name,title,salary 
     FROM employees 
     INNER JOIN employee_role ON employees.role_id = employee_role.id`,

        function (err, results) {
            if (err) throw err;
            console.table(results)

            const idList = []
            const query = connection.query("SELECT id FROM employees",
                function (err, results) {
                    if (err) throw err;
                    for (i = 0; i < results.length; i++) {
                        idList.push(results[i].id)
                    }

                    inquirer.prompt([
                        {
                            type: "list",
                            message: "Select the id number of the employee that you would like to remove.",
                            name: "remove",
                            choices: idList
                        }
                    ])
                        .then(function (answers) {
                            const query = connection.query("DELETE FROM employees WHERE ?",
                                {
                                    id: answers.remove
                                },
                                function (err) {
                                    if (err) throw err;
                                    console.log(`Employee successfully removed
                                    
                                    `);
                                    viewEmployees()
                                
                                })
                        })
            })
        })

}
function addEmployee() {
    choicesArray = []
    connection.query("SELECT title,id FROM employee_role", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            choicesArray.push({
                name: results[i].title,
                value: results[i].id
            });
        }
        inquirer.prompt([
            {
                type: "input",
                message: "What is the first name?",
                name: "first",
    
            },
            {
                type: "input",
                message: "What is the last name?",
                name: "last",
            },
            {
                type: "list",
                message: "select a role",
                name: "role",
                choices: choicesArray
            }
        ])
            .then(function (answers) {

                const query = connection.query("INSERT INTO employees(first_name,last_name,role_id) VALUES(?,?,?)",
                    [
                        `${answers.first}`,
                        `${answers.last}`,
                        `${answers.role}`
    
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log(`Employee successfully added!

                        `);
                        start();
                    })
            })
        
    })
}
function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            message: "what department would you like to add",
            name:"newDept"

        }
    ])
    .then(function(answers){
        const query = connection.query("INSERT INTO department(department_name) VALUES(?)",
        [
            answers.newDept
        ],
        function(err){
            if(err) throw err
            console.log("department successfully added!")
        })
        
    })
}

function viewDepartments(){
    const query = connection.query(
        "SELECT department_name FROM department",

        function (err, results) {
            if (err) throw err;
            console.table(results)
            start()
        })
}

function viewRoles(){
    const query = connection.query(
        `SELECT title,department_name
         FROM employee_role
         INNER JOIN department ON department.id = employee_role.department_id`,
        function(err,results){
            if(err) throw err;
            console.table(results)
            start()
        })
    }

function updateRole(){
    const newRole=[]
    const employeeList=[]
    const query = connection.query(`
    SELECT employees.id,first_name,last_name,title
    FROM employees 
    INNER JOIN employee_role ON employees.role_id = employee_role.id
    INNER JOIN department ON department.id = employee_role.department_id`,
    function(err,results){
        console.table(results)
        for (i = 0; i < results.length; i++) {
            employeeList.push(results[i].id);
            newRole.push({
                name: results[i].title,
                value: results[i].id
            })
        }
        if(err) throw err
        inquirer.prompt([
            {
                type:"list",
                message:"select the id of the employee that you would like to update",
                name: "update",
                choices:employeeList
            },
            {
                type:"list",
                message:"select the new role",
                name:"updated",
                choices:newRole
            }
        ])
        .then(function(answers){
            connection.query(" UPDATE employees SET ?  WHERE ?",
            [
                {
                    role_id: answers.updated
                },
                {
                    id: answers.update
                }
            ]
            )
            console.log(`Role successfully updated!
            
            `)
            start()
            })
        })
    }