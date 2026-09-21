import { QueryResult, ResultSetHeader } from "mysql2";
import { db } from "./database-config";
import fs from 'node:fs/promises';
import { ShowingList, showingListQuery, MovieInfo, movieInfoQuery, ShowingInfo, showingInfoQuery, SeatingInfo, seatingQuery, TicketInfo, ticketsQuery, createTicketQuery, deleteTicketQuery, tableExistsQuery, FormattedSeating } from "./database-definitions";

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
    statement = await db.execute<TicketInfo[]>(ticketsQuery, [showingID]);
    
    return statement[0];
}

export async function createTicket(showingID:number, seatID:number):Promise<Number>{
    const newTicket = (await db.execute<ResultSetHeader>(createTicketQuery, [showingID, seatID]))[0].insertId;

    return newTicket;
}

export async function deleteTicket(ticketID:number):Promise<Boolean>{
    const statement = (await db.execute<ResultSetHeader>(deleteTicketQuery, [ticketID]))[0];

    if(statement.affectedRows !== 0) {
        return true;
    }
    else return false;
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
    // Compare seating list to ticket list and update booked
    let found:boolean;

    seatingData.forEach(seat => {
        found = false;

        if(ticketData !== undefined) {

            ticketData.forEach(ticket => {

                if(found == true) return;
                else if(ticket.seatID == seat.id ) {
                    seat.available = false;
                    found = true;
                }
            });
            if(found == false) seat.available = true;
        }
        else seat.available = true;
    });

    //Convert seating list to a grid for display
    const rowCount = new Set(seatingData.map(seat => seat.seatRow)).size;
    const colCount = new Set(seatingData.map(seat => seat.seatNumber)).size;

    let formattedSeats:FormattedSeating = {array: [], rowCount:rowCount, colCount:colCount};

    for(let i = 0; i * colCount < seatingData.length; i++){
        formattedSeats.array[i] = [];
        for(let j = 0; j < colCount; j++){
            formattedSeats.array[i][j] = seatingData[i * colCount + j];
        }
    }
    return formattedSeats;
}
