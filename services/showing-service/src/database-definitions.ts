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
