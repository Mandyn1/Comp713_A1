import { ResultSetHeader } from "mysql2/promise";
import { db } from "../database-config";
import { CatalogueList, catalogueQuery, createMovieQuery, createShowingQuery, deleteMovieQuery, deleteShowingQuery, updateShowingQuery } from "../admin-definitions";
import { getShowingList } from "./service-showing-list";

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

export async function getAdminLists(){
    let statement;
    try{
        const showings = await getShowingList();
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

// Deleting a movie or showing also removes its showings / tickets
export const createMovie = (name:string, genre:string, director:string) => runQuery(createMovieQuery, [name, genre, director]);
export const deleteMovie = (movieID:number) => runQuery(deleteMovieQuery, [movieID]);
export const createShowing = (movieID:number, date:string) => runQuery(createShowingQuery, [movieID, date]);
export const updateShowing = (showingID:number, date:string) => runQuery(updateShowingQuery, [date, showingID]);
export const deleteShowing = (showingID:number) => runQuery(deleteShowingQuery, [showingID]);