import { ResultSetHeader } from "mysql2/promise";
import { db } from "../database-config";
import { createMovieQuery, deleteMovieQuery } from "../database-definitions";

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

// Deleting a movie or showing also removes its showings / tickets
const createMovie = (name:string, genre:string, director:string) => runQuery(createMovieQuery, [name, genre, director]);
const deleteMovie = (movieID:number) => runQuery(deleteMovieQuery, [movieID]);

const adminFunctions = { createMovie, deleteMovie };
export default adminFunctions;
