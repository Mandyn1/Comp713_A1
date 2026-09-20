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
    seatNumber:number,
    booked:boolean
}

interface TicketInfo extends RowDataPacket{
    ticketID:number,
    seatID:number
}

interface FormattedSeating{
    array:SeatingInfo[][],
    rowCount:Number,
    colCount:Number
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

export async function getShowingList():Promise<ShowingList[]>{
    const statement = await db.execute<ShowingList[]>(showingListQuery);

    return statement[0];
}

export async function getMovieInfo(movieID:number):Promise<MovieInfo>{
    const statement = await db.execute<MovieInfo[]>(movieInfoQuery, [movieID]);
    
    return statement[0][0];
}

export async function getShowingInfo(showingID:number):Promise<ShowingInfo>{
    const statement = await db.execute<ShowingInfo[]>(showingInfoQuery, [showingID]);
    
    return statement[0][0];
}

export async function getSeatingInfo():Promise<SeatingInfo[]>{
    const statement = await db.execute<SeatingInfo[]>(seatingQuery);

    return statement[0];
}

export async function getTicketInfo(showingID:number):Promise<TicketInfo[] | undefined>{

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

export function processTicketData(seatingData: SeatingInfo[], ticketData: TicketInfo[] | undefined):FormattedSeating{ 
    
    let found:boolean;

    seatingData.forEach(seat => {
        found = false;

        if(ticketData !== undefined) {

            ticketData.forEach(ticket => {

                if(found == true) return;
                else if(ticket.seatID == seat.id ) {

                    seat.booked = true;
                    found = true;
                }
            });
            if(found == false) seat.booked = false;
        }
        else seat.booked = false;
    });

    return formatSeatingData(seatingData);
}

function formatSeatingData(seatingData:SeatingInfo[]):FormattedSeating{
    const rowCount = new Set(seatingData.map(seat => seat.seatRow)).size;
    const colCount = new Set(seatingData.map(seat => seat.seatNumber)).size;

    let formattedSeats:FormattedSeating = {array: [[]], rowCount:rowCount, colCount:colCount};

    for(let i = 0; i < seatingData.length; i + rowCount){
        for(let j = 0; j < colCount; j++){
            formattedSeats.array[i][j] = seatingData[j + i];
        }
    }
    console.log(formattedSeats);
    return formattedSeats;
}
