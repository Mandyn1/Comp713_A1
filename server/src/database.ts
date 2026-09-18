import { db } from "./database-config";

export let movieID:number;
export let showingID:number;

export async function getShowingList(){
    const statement = await db.execute("SELECT showings.showing_date as showing_date, movies.name as movie from showings INNER JOIN movies ON showings.movie = movies.id");

    return statement[0];
}

export async function getMovieInfo(movieID:number){
    const statement = await db.execute("SELECT name, genre, director FROM movies WHERE id = ?", [movieID]);
    
    return statement[0];
}

export async function getShowingInfo(showingID:number){
    const statement = await db.execute("SELECT movies.name, showings.showing_date, seats.id, seats.row, seats.number FROM showing WHERE showing.id = ? INNER JOIN movies ON showings.movie = movies.id INNER JOIN tickets ON showings.id = tickets.showing INNER JOIN seats ON tickets.seat = seats.id", [showingID]);
    
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