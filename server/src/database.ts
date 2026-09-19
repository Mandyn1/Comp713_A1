import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "./database-config";
import fs from 'node:fs/promises';

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
    showingDate:string,
    seatID:Number,
    seatRow:string,
    seatNumber:Number
}

export async function getShowingList(){
    const statement = await db.execute<ShowingList[]>("SELECT DATE_FORMAT(showings.showing_date, '%d/%m/%Y') as showingDate, movies.movieName as movie from showings INNER JOIN movies ON showings.movie = movies.id");

    return statement[0];
}

export async function getMovieInfo(movieID:number){
    const statement = await db.execute<MovieInfo[]>("SELECT movieName, genre, director FROM movies WHERE id = ?", [movieID]);
    
    return statement[0];
}

export async function getShowingInfo(showingID:number){
    const statement = await db.execute<ShowingInfo[]>("SELECT movies.movieName, DATE_FORMAT(showings.showing_date, '%d/%m/%Y') as showingDate, seats.id as seatID, seats.seatRow as seatRow, seats.seatNumber as seatNumber FROM showing WHERE showing.id = ? INNER JOIN movies ON showings.movie = movies.id INNER JOIN tickets ON showings.id = tickets.showing INNER JOIN seats ON tickets.seat = seats.id", [showingID]);
    
    return statement[0];
}

export async function createTicket(showingID:number, seatID:number){
    const statement = await db.execute<ResultSetHeader>("INSERT INTO tickets (showing, seat) VALUES (?, ?)", [showingID, seatID]);

    return statement[0];
}

export async function deleteTicket(ticketID:number){
    const statement = await db.execute<ResultSetHeader>("DELETE FROM tickets WHERE id = ?", [ticketID]);

    return statement[0];
}

export async function reloadDatabase():Promise<boolean>{
    try {
        const schema = await fs.readFile("schema.sql", 'utf-8');
        const seed = await fs.readFile("seed.sql", 'utf-8');

        await db.query(schema);
        await db.query(seed);
        
        console.log('Database reloaded');
        return true;
    } catch (error) {
        console.error('Database reload error', error);
        return false;
    }
}

export async function checkConnection():Promise<boolean>{
    try{
        await db.ping();
        return true;
    }
    catch(err){
        return false;
    }
}