import { db } from "../database-config";
import { MovieInfo, movieInfoQuery } from "../database-definitions";

export async function getMovieInfo(movieID:number):Promise<MovieInfo|undefined>{
    let statement;
    try{
        statement = (await db.execute<MovieInfo[]>(movieInfoQuery, [movieID]))[0][0];
    }
    catch(err){
        statement = undefined;
        console.log("getMovieInfo Error:\n" + err);
    }
    return statement;
}
