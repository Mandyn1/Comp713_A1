import seatFunctions from "../functions/seat";
import ticketFunctions from "../functions/ticket";
import {status as grpcStatus} from '@grpc/grpc-js';

const createTicket = (call: any, callback: any) => {
    console.log(`gRPC request: Create Ticket`);

  ticketFunctions.createTicket(call.request.showingID, call.request.seatID)
  .then((success) => {

    if(success == undefined) throw new Error("Unable to create ticket");

    callback(success);
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
}

const releaseTicket = (call: any, callback: any) => {
    console.log(`gRPC request: Delete Ticket`);

  ticketFunctions.deleteTicket(call.request.ticketID)
  .then((success) => {

    if(success == undefined) throw new Error("Unable to delete ticket");

    callback(success);
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
}

const processTicketData = (call: any, callback: any) => {
    console.log(`gRPC request: Process Ticket Data / Get Seating Data`);

  seatFunctions.getSeatingInfo()
  .then((seatData) => {
    if(seatData == undefined) throw new Error("Unable to get seating data");

    ticketFunctions.getTicketInfo(call.request.showingID)
    .then((ticketData) => {

        const formattedSeating = ticketFunctions.processTicketData(seatData, ticketData);

        callback(formattedSeating);
    })

    throw new Error("Error sending seating data");
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
}

const ticketHandler = {createTicket, releaseTicket, processTicketData};

export default ticketHandler;
