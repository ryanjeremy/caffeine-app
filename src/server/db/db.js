import mysql from 'mysql';

export default (generalConnection = false) =>
    mysql.createConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: generalConnection ? null : process.env.DB_NAME,
        socketPath: process.env.DB_SOCKET_PATH,
    });
