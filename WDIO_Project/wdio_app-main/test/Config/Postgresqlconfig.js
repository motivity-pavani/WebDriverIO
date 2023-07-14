const { Pool } = require('pg');
const format = require('pg-format');

//const { config } = require('../config');
const config = {
    user: 'postgres',
    database: 'qa_automation_dev',
    password: 'Testing123!',
    port: 5432,
    host: 'qa-automation-dev.cpvhw7w0kbf5.us-east-1.rds.amazonaws.com',
}
// const config = {
//     user: 'testmaster',
//     database: 'test_master',
//     password: 'testmaster',
//     port: 5432,
//     host: 'localhost',
// }
const pool = new Pool(config)

const queryExecution = (q) => {
    return new Promise(async (reslove, reject) => {
        try {
            const { rows } = await pool.query(format(q));
            reslove(rows)
        }
        catch (err) {
            console.error(`Query:${q}
            Error:${err.message}`)
            reject(new Error(err.message))
        }

    })

}

module.exports = { pool, queryExecution };