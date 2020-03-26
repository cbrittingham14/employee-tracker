
const mysql = require("mysql");
const util = require("util");
const { prompt } = require("inquirer");

const choices = [
    {
        name: "Add roles",
        value: "add_roles",
    },
    {
        name: "View roles",
        value: "view_roles",
    },
    {
        name: "Add employee",
        value: "add_emp",
    },
    {
        name: "View employees",
        value: "view_emp",
    },
    {
        name: "View departments",
        value: "view_dep",
    },
    {
        name: "Add  departments",
        value: "add_dep",
    },
    {
        name: "Update employee role",
        value: "update_role",
    },
];
// MySQL DB Connection Information (remember to change this with our specific credentials)
const c = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "company_db"
});

c.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + c.threadId + "\n");
  });

// const connectAsync = util.promisify(c.connect);
const queryAsync = util.promisify(c.query).bind(c);

async function queryUser() {
    try{
        let { selection } = await prompt({
            name: "selection",
            message: "What would you like to do?",
            type: "rawlist",
            choices: choices
        })
        console.log("selection ", selection);
        
        let query = await makeQuery(selection);

        let data = await queryAsync(query);
        console.table(data);
        // c.query(query, function(err, data){
        //     if(err) throw err;
        //     console.table(data);
        // });

    }
    catch {
        if(err) throw err;
    }
    queryUser();
}
queryUser();

async function makeQuery (sel){
    let query;
    switch (sel){
        case 'view_emp':
            return "SELECT * FROM employees";
            // let c = await queryAsync("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
            console.table(c);
        case 'view_dep':
            return "SELECT * FROM departments";
        case 'view_roles':
            return "SELECT * FROM roles";
        case '':
            query = "";
        case '':
            query = "";
        default:
            console.log("didnt catch a case");
    // sendQuery(query);
    }
}

// // async function sendQuery(q){
// //     await queryAsync(q);
// // }

// c.query("SELECT * FROM employees", (err, result)=>{
//     if(err) throw err;
//     console.log(result);
// });