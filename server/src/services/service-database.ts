import { QueryResult } from "mysql2";
import { db } from "../database-config";
import fs from 'node:fs/promises';
import { tableExistsQuery } from "../database-definitions";

export async function reloadDatabase():Promise<boolean>{
    try {
        const schema = await fs.readFile("schema.sql", 'utf-8');
        const seed = await fs.readFile("seed.sql", 'utf-8');

        await db.query(schema);
        await db.query(seed);
        
        console.log('Database reloaded');
        return true;
    } catch (error) {
        console.error('Database reload error', error);
        return false;
    }
}

export async function checkConnection():Promise<boolean>{
    try{
        await db.ping();
        return true;
    }
    catch(err){
        return false;
    }
}

export async function checkTableExists(tableName:string):Promise<boolean|undefined>{
    let check;
    try{
        check = (await db.execute<QueryResult>(tableExistsQuery, [tableName]))[0] as { count: number }[];

        if(check.length > 0 && check[0].count > 0) return true;
        else return false;
    }
    catch(err){
        console.log("getShowingList Error:\n" + err);
        return undefined;
    }
}
