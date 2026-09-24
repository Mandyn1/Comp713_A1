import { ResultSetHeader } from "mysql2/promise";
import { db } from "../database-config";
import { createTicketQuery, deleteTicketQuery, FormattedSeating, SeatingInfo, TicketInfo, ticketsQuery } from "../database-definitions";

export async function getTicketInfo(showingID:number):Promise<TicketInfo[] | undefined>{
    let statement;
    try{
        statement = (await db.execute<TicketInfo[]>(ticketsQuery, [showingID]))[0];
    }
    catch(err){
        statement = undefined;
        console.log("getTicketInfo Error:\n" + err);
    }
    return statement;
}

export async function createTicket(showingID:number, seatID:number):Promise<Number|undefined>{
    let newTicket;
    try{
        newTicket = (await db.execute<ResultSetHeader>(createTicketQuery, [showingID, seatID]))[0].insertId;
    }
    catch(err){
        newTicket = undefined;
        console.log("createTicket Error:\n" + err);
    }
    return newTicket;
}

export async function deleteTicket(ticketID:number):Promise<Boolean|undefined>{
    let statement;
    try{
        statement = (await db.execute<ResultSetHeader>(deleteTicketQuery, [ticketID]))[0];

        if(statement.affectedRows !== 0) {
            return true;
        }
        else return false;
    }
    catch(err){
        statement = undefined;
        console.log("deleteTicket Error:\n" + err);
    }
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
