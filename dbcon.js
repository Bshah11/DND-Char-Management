var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_shahbh',
  password        : '3777',
  database        : 'cs340_shahbh'
});

module.exports.pool = pool;
