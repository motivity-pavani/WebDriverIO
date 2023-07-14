const { Pool } = require('pg');
const { config } = require('../config');
const pool = new Pool(config)
const queryExecution = (q) => {
    return new Promise(async (reslove, reject) => {
        try {
            const { rows } = await pool.query(q);
            reslove(rows)
        }
        catch (err) {
            logger.error(`Query:${q}
            Error:${err.message}`)
            reject(new Error(err.message))
            // reject(new Error(`Something went wrong please try again (DB)`))


        }
    })
}
const queryMultiExecution = (q) => {
    return new Promise(async (reslove, reject) => {
        try {
            const rows = await pool.query(q);
            reslove(rows)
        }
        catch (err) {
            logger.error(`Query:${q}
            Error:${err.message}`)
            reject(new Error(err.message))
            // reject(new Error(`Something went wrong please try again (DB)`))


        }
    })
}
module.exports = { pool, queryExecution, queryMultiExecution };
