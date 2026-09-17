
import mysql from 'mysql2/promise'
import 'dotenv/config'

// connection pools automatically use existing connections intead of openning new ones

const pool = mysql.createPool({
    url: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10, // maximum simultaneous connections
    queueLimit: 0,
    dateStrings: false // returns dates as javascript objects intead of strings
})

export default pool