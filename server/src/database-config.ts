import mysql from 'mysql2/promise'; // I dont know specifically why using /promise but they do in the documentation i read
import credentials from '../server-credentials.json';

function startConnection(): mysql.Pool {
    //REQUIRED doesnt convert directly, have to do funny business
    let ssl_mode = undefined;
    if(credentials.ssl_mode == 'REQUIRED') ssl_mode = { rejectUnauthorized: false };

    return mysql.createPool({
        host: credentials.host,
        port: Number(credentials.port),
        user: credentials.username,
        password: credentials.password,
        database: credentials.schema,
        connectionLimit: 5,
        ssl: ssl_mode,
        multipleStatements:true
    });
}

export const db = startConnection();