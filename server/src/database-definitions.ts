import { RowDataPacket } from "mysql2/promise"

export interface ShowingList extends RowDataPacket{
    id:number,
    showingDate: Date,
    movie:string
}

export interface MovieInfo extends RowDataPacket{
    name:string,
    genre:string,
    director:string
}

export interface ShowingInfo extends RowDataPacket{
    name:string,
    showingDate:string
}

export interface SeatingInfo extends RowDataPacket{
    id:number,
    seatRow:string,
    seatNumber:number,
    available:boolean
}

export interface TicketInfo extends RowDataPacket{
    ticketID:number,
    seatID:number,
    confirmed:boolean,
    timer:number
}

export interface FormattedSeating{
    array:SeatingInfo[][],
    rowCount:Number,
    colCount:Number
}

export interface NewTicket extends RowDataPacket{
    id:Number
}


export const showingListQuery:string = "SELECT showings.id, DATE_FORMAT(showings.showing_date, '%d/%m/%Y') as showingDate, movies.movieName as movie "+
                                "from showings " +
                                "INNER JOIN movies ON showings.movie = movies.id " +
                                "ORDER BY showings.showing_date, movies.movieName";

export const movieInfoQuery:string = "SELECT movieName, genre, director FROM movies " +
                                "WHERE id = ?";

export const showingInfoQuery:string = "SELECT movies.movieName as name, DATE_FORMAT(showings.showing_date, '%d/%m/%Y') as showingDate " + 
                                "FROM showings " +
                                "INNER JOIN movies ON showings.movie = movies.id " +
                                "WHERE showings.id = ?";

export const seatingQuery:string = "SELECT seats.id as id, seats.seatRow as seatRow, seats.seatNumber as seatNumber " + 
                            "FROM seats";

export const ticketsQuery:string = "SELECT tickets.id as ticketID, tickets.seat as seatID, tickets.confirmed as confirmed " + 
                            "FROM tickets " +
                            "INNER JOIN tickets ON showings.id = tickets.showing " +
                            "WHERE tickets.showing = ?";

export const createTicketQuery:string = "INSERT INTO tickets (showing, seat, confirmed, timer) " +
                                "VALUES (?, ?, FALSE, 120); " +
                                "SELECT LAST_INSERT_ID() as id;";

export const deleteTicketQuery:string = "DELETE FROM tickets " +
                                "WHERE id = ?";

export const tableExistsQuery:string = "SELECT COUNT(*) as count " +
                                    "FROM information_schema.tables " +
                                    "WHERE table_schema = DATABASE() " +
                                    "AND table_name = '?'"

export const ticketTimerUpdateQuery:string = "UPDATE tickets " +
                                        "SET timer = GREATEST(0, timer - ?) " +
                                        "WHERE confirmed = FALSE"

export const ticketTimerQuery:string = "SELECT id " +
                                        "FROM tickets " +
                                        "WHERE confirmed = FALSE , timer = 0"

export const confirmTicketQuery:string = "UPDATE tickets " +
                                        "SET confirmed = TRUE " +
                                        "WHERE id = ?"