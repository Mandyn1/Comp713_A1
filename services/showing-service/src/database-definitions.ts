import { RowDataPacket } from "mysql2/promise"

export interface ShowingList extends RowDataPacket{
    id:number,
    showingDate: Date,
    movie:string,
    movieID:number
}

export interface ShowingInfo extends RowDataPacket{
    id:number,
    name:string,
    showingDate:string,
    movieID:number
}

export interface SeatingInfo extends RowDataPacket{
    id:number,
    seatRow:string,
    seatNumber:number,
    available:boolean
}

export interface CatalogueList extends RowDataPacket{
    id:number,
    name:string,
    genre:string,
    director:string
}

export const showingListQuery:string = "SELECT showings.id, DATE_FORMAT(showings.showing_date, '%d/%m/%Y') as showingDate, movies.movieName as movie, movies.id as movieID "+
                                "from showings " +
                                "INNER JOIN movies ON showings.movie = movies.id " +
                                "ORDER BY showings.showing_date, movies.movieName";

export const showingInfoQuery:string = "SELECT showings.id as id, movies.movieName as name, DATE_FORMAT(showings.showing_date, '%d/%m/%Y') as showingDate, movies.id as movieID " + 
                                "FROM showings " +
                                "INNER JOIN movies ON showings.movie = movies.id " +
                                "WHERE showings.id = ?";

export const seatingQuery:string = "SELECT seats.id as id, seats.seatRow as seatRow, seats.seatNumber as seatNumber " + 
                                "FROM seats";

export const createShowingQuery:string = "INSERT INTO showings (movie, showing_date) " +
                                "VALUES (?, ?)";

export const updateShowingQuery:string = "UPDATE showings SET showing_date = ? " +
                                "WHERE id = ?";

export const deleteShowingQuery:string = "DELETE FROM showings " +
                                "WHERE id = ?";

// Movies with showings first, then the rest, each part in alphabetical order
export const catalogueQuery:string = "SELECT movies.id, movies.movieName as name, movies.genre, movies.director " +
                                "FROM movies " +
                                "LEFT JOIN showings ON showings.movie = movies.id " +
                                "GROUP BY movies.id, movies.movieName, movies.genre, movies.director " +
                                "ORDER BY COUNT(showings.id) = 0, movies.movieName";
