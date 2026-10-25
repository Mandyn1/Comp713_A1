import express from 'express';
import helperFunction from '../helperfunctions';
import port from '../../../port-numbers.json'
import * as grpc from '@grpc/grpc-js';

const router = express.Router();

//Initiate grpc client
const ticketClient = new (helperFunction.getProto('ticket')).TicketService(
  'localhost:' + port.ticket,
  grpc.credentials.createInsecure()
);

//Reserve seat and start release timer
router.get('/reserve/:seatID-in=:showingID', async (req, res) => {
  const showingID = Number(req.params.showingID);
  const seatID = Number(req.params.seatID);

  ticketClient.CreateTicket({showingID: showingID, seatID: seatID}, (error:any, response:any) => {
    if (error) return res.status(409).send("Unable to create ticket");
    else return res.status(201).send({ message: response.ticketID });
  });
});

//Release seat and end release timer (if no other seats are reserved)
router.get('/release/:ticketID', async (req, res) => {
  const ticketID = Number(req.params.ticketID);

  ticketClient.DeleteTicket({ticketID: ticketID}, (error:any, response:any) => {
    if (error) return res.status(409).send("Unable to delete ticket");
    else return res.sendStatus(204);
  });
});

export default router;