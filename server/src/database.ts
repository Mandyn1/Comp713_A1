import { RowDataPacket } from "mysql2";
import { db } from "./database-config";

interface ShowingList extends RowDataPacket{
    showingDate: Date,
    movie:string
}

interface MovieInfo extends RowDataPacket{
    name:string,
    genre:string,
    director:string
}

interface ShowingInfo extends RowDataPacket{
    name:string,
    showingDate: Date,
    seatID:Number,
    seatRow:string,
    seatNumber:Number
}

export async function getShowingList(){
    const statement = await db.execute<ShowingList[]>("SELECT showings.showing_date as showingDate, movies.name as movie from showings INNER JOIN movies ON showings.movie = movies.id");

    return statement[0];
}

export async function getMovieInfo(movieID:number){
    const statement = await db.execute<MovieInfo[]>("SELECT name, genre, director FROM movies WHERE id = ?", [movieID]);
    
    return statement[0];
}

export async function getShowingInfo(showingID:number){
    const statement = await db.execute<ShowingInfo[]>("SELECT movies.name, showings.showing_date as showingDate, seats.id as seatID, seats.row as seatRow, seats.number as seatNumber FROM showing WHERE showing.id = ? INNER JOIN movies ON showings.movie = movies.id INNER JOIN tickets ON showings.id = tickets.showing INNER JOIN seats ON tickets.seat = seats.id", [showingID]);
    
    return statement[0];
}

export async function createTicket(showingID:number, seatID:number){
    const statement = await db.execute("INSERT INTO tickets (showing, seat) VALUES (?, ?)", [showingID, seatID]);

    return statement;
}

export async function deleteTicket(ticketID:number){
    const statement = await db.execute("DELETE FROM tickets WHERE id = ?", [ticketID]);

    return statement;
}