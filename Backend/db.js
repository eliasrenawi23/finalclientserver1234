
const mysql = require('mysql');

const con_mysql = mysql.createConnection({
  user:"bdcdfb54749b95",
  host: "us-cdbr-east-04.cleardb.com",
  password: "6be444ae"
});

con_mysql.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL DataBase");
});
module.exports=con_mysql;