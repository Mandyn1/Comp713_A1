import { RowDataPacket } from "mysql2/promise"

export interface MovieInfo extends RowDataPacket{
    name:string,
    genre:string,
    director:string
}

export const movieInfoQuery:string = "SELECT movieName as name, genre, director FROM movies " +
                                "WHERE id = ?";
