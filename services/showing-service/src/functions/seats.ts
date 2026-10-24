import { db } from "../database-config";
import { SeatingInfo, seatingQuery } from "../database-definitions";

export async function getSeatingInfo():Promise<SeatingInfo[]|undefined>{
    let statement;
    try{ 
        statement = (await db.execute<SeatingInfo[]>(seatingQuery))[0];
    }
    catch(err){
        statement = undefined;
        console.log("getSeatingInfo Error:\n" + err);
    }
    return statement;
}
