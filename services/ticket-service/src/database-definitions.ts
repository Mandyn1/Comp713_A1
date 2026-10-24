import { RowDataPacket } from "mysql2/promise"

export interface SeatingInfo extends RowDataPacket{
    id:number,
    seatRow:string,
    seatNumber:number,
    available:boolean
}

export interface TicketInfo extends RowDataPacket{
    ticketID:number,
    seatID:number,
}

export interface FormattedSeating{
    array:SeatingInfo[][],
    rowCount:Number,
    colCount:Number
}

export const seatingQuery:string = "SELECT seats.id as id, seats.seatRow as seatRow, seats.seatNumber as seatNumber " + 
                            "FROM seats";

export const ticketsQuery:string = "SELECT tickets.id as ticketID, tickets.seat as seatID " + 
                            "FROM tickets " +
                            "INNER JOIN showings ON showings.id = tickets.showing " +
                            "WHERE tickets.showing = ?";

export const createTicketQuery:string = "INSERT INTO tickets (showing, seat) " +
                                "VALUES (?, ?)";

export const deleteTicketQuery:string = "DELETE FROM tickets " +
                                "WHERE id = ?";

export const tableExistsQuery:string = "SELECT COUNT(*) as count " +
                                    "FROM information_schema.tables " +
                                    "WHERE table_schema = DATABASE() " +
                                    "AND table_name = '?'"
