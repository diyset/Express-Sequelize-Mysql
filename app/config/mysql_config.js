'use strict';

let mysql = require('mysql');

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'diannodejs'
});

connection.connect();

module.exports=connection;