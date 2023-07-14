
const Pool = require('pg').Pool



const db_Connection = new Pool({

    user: "UserLogin",

    host: "localhost",

    database: "QAAutomation",

    password: "root",

    port: 5432

})


module.exports.db_Connection = db_Connection;

