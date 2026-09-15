import mysql from 'mysql2/promise'; // I dont know specifically why using /promise but they do in the documentation i read
import credentials from '../server-credentials.json';

async function startConnection() {
    //REQUIRED doesnt convert directly, have to do funny business
    let ssl_mode = undefined;
    if(credentials.ssl_mode == 'REQUIRED') ssl_mode = { rejectUnauthorized: false };

    const connectionPool = mysql.createPool({
        host: credentials.host,
        port: Number(credentials.port),
        user: credentials.username,
        password: credentials.password,
        database: credentials.schema,
        connectionLimit: 5,
        ssl: ssl_mode
    });

    console.log('pool started');

    const test = await connectionPool.execute('SHOW TABLES;');
    console.log(test);
}

startConnection();