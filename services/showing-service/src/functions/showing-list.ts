import { db } from "../database-config";
import { ShowingList, showingListQuery } from "../database-definitions";

export async function getShowingList():Promise<ShowingList[]|undefined>{
    let statement;
    try{
        statement = (await db.execute<ShowingList[]>(showingListQuery))[0];
    }
    catch(err){
        statement = undefined;
        console.log("getShowingList Error:\n" + err);
    }
    return statement;
}
