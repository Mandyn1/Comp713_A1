import { RowDataPacket } from "mysql2/promise"

export interface CatalogueList extends RowDataPacket{
    id:number,
    name:string,
    genre:string,
    director:string
}

// Movies with showings first, then the rest, each part in alphabetical order
export const catalogueQuery:string = "SELECT movies.id, movies.movieName as name, movies.genre, movies.director " +
                                "FROM movies " +
                                "LEFT JOIN showings ON showings.movie = movies.id " +
                                "GROUP BY movies.id, movies.movieName, movies.genre, movies.director " +
                                "ORDER BY COUNT(showings.id) = 0, movies.movieName";

export const createMovieQuery:string = "INSERT INTO movies (movieName, genre, director) " +
                                "VALUES (?, ?, ?)";

export const deleteMovieQuery:string = "DELETE FROM movies " +
                                "WHERE id = ?";

export const createShowingQuery:string = "INSERT INTO showings (movie, showing_date) " +
                                "VALUES (?, ?)";

export const updateShowingQuery:string = "UPDATE showings SET showing_date = ? " +
                                "WHERE id = ?";

export const deleteShowingQuery:string = "DELETE FROM showings " +
                                "WHERE id = ?";