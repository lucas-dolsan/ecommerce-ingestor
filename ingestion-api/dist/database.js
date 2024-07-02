"use strict";
const { Pool } = require('pg');
const databaseConnectionPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
});
module.exports = databaseConnectionPool;
