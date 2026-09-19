import { QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "./database-config";
import fs from 'node:fs/promises';

interface ShowingList extends RowDataPacket{
    id:number,
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
    showingDate:string
}

interface SeatingInfo extends RowDataPacket{
    id:number,
    seatRow:string,
    seatNumber:number
}

interface TicketInfo extends RowDataPacket{
    ticketID:number,
    seatID:number
}


const showingListQuery:string = "SELECT showings.id, DATE_FORMAT(showings.showing_date, '%d/%m/%Y') as showingDate, movies.movieName as movie "+
                                "from showings " +
                                "INNER JOIN movies ON showings.movie = movies.id " +
                                "ORDER BY showings.showing_date, movies.movieName";

const movieInfoQuery:string = "SELECT movieName, genre, director FROM movies " +
                                "WHERE id = ?";

const showingInfoQuery:string = "SELECT movies.movieName as name, DATE_FORMAT(showings.showing_date, '%d/%m/%Y') as showingDate " + 
                                "FROM showings " +
                                "INNER JOIN movies ON showings.movie = movies.id " +
                                "WHERE showings.id = ?";

const seatingQuery:string = "SELECT seats.id as id, seats.seatRow as seatRow, seats.seatNumber as seatNumber " + 
                            "FROM seats";

const ticketsQuery:string = "SELECT tickets.id as ticketID, tickets.seat as seatID " + 
                            "FROM tickets " +
                            "INNER JOIN tickets ON showings.id = tickets.showing " +
                            "WHERE tickets.showing = ?";

const createTicketQuery:string = "INSERT INTO tickets (showing, seat) " +
                                "VALUES (?, ?)";

const deleteTicketQuery:string = "DELETE FROM tickets " +
                                "WHERE id = ?";

const tableExistsQuery:string = "SELECT COUNT(*) as count " +
                                    "FROM information_schema.tables " +
                                    "WHERE table_schema = DATABASE() " +
                                    "AND table_name = '?'"

export async function getShowingList(){
    const statement = await db.execute<ShowingList[]>(showingListQuery);

    return statement[0];
}

export async function getMovieInfo(movieID:number){
    const statement = await db.execute<MovieInfo[]>(movieInfoQuery, [movieID]);
    
    return statement[0];
}

export async function getShowingInfo(showingID:number){
    const statement = await db.execute<ShowingInfo[]>(showingInfoQuery, [showingID]);
    
    return statement[0][0];
}

export async function getSeatingInfo(showingID:number){
    const statement = await db.execute<SeatingInfo[]>(seatingQuery, [showingID]);

    return statement[0];
}

export async function getTicketInfo(showingID:number){

    let statement;

    if( await checkTableExists("tickets")) statement = await db.execute<TicketInfo[]>(ticketsQuery, [showingID]);
    else return;

    return statement[0];
}

export async function createTicket(showingID:number, seatID:number){
    const statement = await db.execute<ResultSetHeader>(createTicketQuery, [showingID, seatID]);

    return statement[0];
}

export async function deleteTicket(ticketID:number){
    const statement = await db.execute<ResultSetHeader>(deleteTicketQuery, [ticketID]);

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

export async function checkTableExists(tableName:string):Promise<boolean>{
    const check = (await db.execute<QueryResult>(tableExistsQuery, [tableName]))[0] as { count: number }[];

    if(check.length > 0 && check[0].count > 0) return true;
    else return false;
}