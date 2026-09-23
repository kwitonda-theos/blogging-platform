
import mysql from 'mysql2/promise'
import 'dotenv/config'

// connection pools automatically use existing connections intead of openning new ones

const pool = mysql.createPool(process.env.DATABASE_URL || {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // maximum simultaneous connections
    queueLimit: 0,
    dateStrings: false // returns dates as javascript objects intead of strings
})

export default pool