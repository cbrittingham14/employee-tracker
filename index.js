
var mysql = require("mysql");
var util = require("util");



// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Cb_292307",
  database: "company_db"
});

connection.query("SELECT * FROM employees", (err, result)=>{
    if(err) throw err;
    console.log(result);
})

