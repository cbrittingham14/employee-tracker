
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
    {
        name: "Quit",
        value: "quit"
    }
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

 c.query = util.promisify(c.query);

queryUser();


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
        

        let data = await c.query(query);
        console.table(data);

    }
    catch {
        if(Error) throw Error;
    }
    queryUser();
}


async function makeQuery (selection){
    
    switch (selection){
        case 'view_emp':
            return "SELECT * FROM employees";
        case 'view_dep':
            return "SELECT * FROM departments";
        case 'view_roles':
            return "SELECT * FROM roles";
        case 'add_roles':
            addRole();
            return  "INSERT";
        case 'add_dep':
            addDepartment();
            return  "";
        case 'add_emp':
            addEmployee();
            return ""
        case 'update_role':
            updateRole();
            return "";
        case 'quit':
            quit();
        default:
            console.log("didnt catch a case");
            return "quit";
    }
}
async function addRole(){
     try{   
        let departments = await c.query("SELECT departments.id, departments.name, SUM(roles.salary) AS utilized_budget FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id GROUP BY departments.id, departments.name;")
        console.log(departments);
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        const role = await prompt([
            {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentChoices
            },
            {
            name: "salary",
            message: "What is the salary of the role?"
            },
            {
            name: "title",
            message: "What is the name of the role?"
            },
        ]);
        await c.query("INSERT INTO roles SET ?", role);

     }
     catch{if(err) throw err};
     queryUser()
}
async function addDepartment(){
    try{
        const department = await prompt([
            {
            name: "name",
            message: "What is the name of the department?"
            }
        ]);
        c.query("INSERT INTO departments SET ?", department);
    }
    catch{if(error) throw error;
    }
    queryUser();
}
async function addEmployee(){
    try{
        let roles = await c.query("SELECT roles.id, roles.title, departments.name AS departments, roles.salary FROM roles LEFT JOIN departments on roles.department_id = departments.id;");
        
        const newEmployee = await prompt([
            {
            name: "first_name",
            message: "What is the employee's first name?"
            },
            {
            name: "last_name",
            message: "What is the employee's last name?"
            }
        ]);

        let roleOptions = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));

        let { roleId } = await prompt({
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roleOptions
        });
        
        newEmployee.role_id = roleId;

        await c.query("INSERT INTO employees SET ?", newEmployee);
    }
    catch{if(error) throw error};
    queryUser();
}
async function updateRole(){
    
    queryUser();
    
}
function quit(){
    process.exit();
}