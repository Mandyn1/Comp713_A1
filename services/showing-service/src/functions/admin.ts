import { ResultSetHeader } from "mysql2";
import { db } from "../database-config";
import { createShowingQuery, updateShowingQuery, deleteShowingQuery, CatalogueList, catalogueQuery } from "../database-definitions";
import showingFunctions from "./showing";

// Runs any admin change, gives undefined if it failed or changed nothing
async function runQuery(query:string, params:(string|number)[]):Promise<ResultSetHeader|undefined>{
    let statement;
    try{
        statement = (await db.execute<ResultSetHeader>(query, params))[0];

        if(statement.affectedRows == 0) statement = undefined;
    }
    catch(err){
        statement = undefined;
        console.log("runQuery Error:\n" + err);
    }
    return statement;
}

async function getAdminLists(){
    let statement;
    try{
        const showings = await showingFunctions.getShowingList();
        const movies = (await db.execute<CatalogueList[]>(catalogueQuery))[0];

        if(showings == undefined) throw new Error("getShowingList failed");
        statement = { showings: showings, movies: movies };
    }
    catch(err){
        statement = undefined;
        console.log("getAdminLists Error:\n" + err);
    }
    return statement;
}

const createShowing = (movieID:number, date:string) => runQuery(createShowingQuery, [movieID, date]);
const updateShowing = (showingID:number, date:string) => runQuery(updateShowingQuery, [date, showingID]);
const deleteShowing = (showingID:number) => runQuery(deleteShowingQuery, [showingID]);

const adminFunctions = { getAdminLists, createShowing, updateShowing, deleteShowing };
export default adminFunctions;