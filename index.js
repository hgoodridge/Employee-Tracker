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
                "update employee role"
            ]

        }
    ])
        .then(function (answers) {
            
            if( answers.start === "view all employees"){
                viewEmployees();
            }else if(answers.start === "remove employee"){
                removeEmployee();
            }else if(answers.start === "add employee"){
                addEmployee();
            }else if(answers.start === "update employee role"){
                updateRole();
            }
        })
}

function viewEmployees() {
    const query = connection.query(
        `SELECT first_name, last_name,title,salary 
         FROM employees 
         INNER JOIN employee_role ON employees.role_id = employee_role.id`,

        function (err, results) {
            if (err) throw err;
            console.log("-----------------------")
            console.table(results)
        })
        // start()
}

function removeEmployee() {
viewEmployees()
const idList=[]
const query = connection.query("SELECT id FROM employees",
        function (err, results) {
            if (err) throw err;
            for(i = 0; i <results.length; i++){
                idList.push(results[i].id - 1)
            }
            
            inquirer.prompt([
                {
                    type: "list",
                    message:"Select the index number of the employee that you would like to remove.",
                    name:"remove",
                    choices: idList
        
        
    }
])
.then(function(answers){
    const query = connection.query("DELETE FROM employees WHERE ?",
    {
        id: answers.remove
    },
    function(err) {
        if (err) throw err;
        console.log("Employee successfully removed");
        viewEmployees()
        console.log("-----------------------")
        // start()
    })
})
})
}
function addEmployee() {
    choicesArray = []
    connection.query("SELECT title,id FROM employee_role", function(err,results){
        if(err) throw err;
        for (var i = 0; i < results.length; i++) {
            choicesArray.push(results[i].title);
          }
    })
    inquirer.prompt([
        {
            type: "input",
            message:"What is the first name?",
            name:"first",
        
        },
        {
            type: "input",
            message:"What is the last name?",
            name:"last",
        },
        {
            type: "rawlist",
            message:"select a role",
            name:"role",
            choices: choicesArray
        }
    ])
    .then(function(answers){
        var pick
        if( answers.role === "Sales Lead"){
            pick = 1
        }else if( answers.role=== "Salesperson"){
            pick = 2
        }else if( answers.role==="Lead Engineer" ){
            pick = 3
        }else if( answers.role==="Software Engineer" ){
            pick = 4
        }else if( answers.role === "Accountant"){
            pick = 5
        }
        const query = connection.query("INSERT INTO employees(first_name,last_name,role_id) values(?, ?,?)",
        [
         `${answers.first}`,
         `${answers.last}`,
         `${pick}`

        ],
        function(err) {
            if (err) throw err;
            console.log("Employee successfully added!");
        })
    })
    // start()
}