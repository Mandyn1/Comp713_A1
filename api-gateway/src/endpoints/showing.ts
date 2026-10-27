import express from 'express';
import helperFunction from '../helperfunctions';
import port from '../../../port-numbers.json'
import * as grpc from '@grpc/grpc-js';

const router = express.Router();

//Initiate grpc client
const showingClient = new (helperFunction.getProto('showing')).ShowingService(
  'localhost:' + port.showing,
  grpc.credentials.createInsecure()
);

//Initiate grpc client
const ticketClient = new (helperFunction.getProto('ticket')).TicketService(
  'localhost:' + port.ticket,
  grpc.credentials.createInsecure()
);

//General Showing List (Server rendered view or Json payload if mobile)
router.get('/', async (req, res) => {
  const notMobile = req.headers['app-type'] !== `mobile`;

  showingClient.GetShowingList({}, (error:any, response:any) => {
    if(error) {
      if(notMobile) res.render('error', {errorCode: 500, errorMessage:"Unable to load Showing List"});
      else res.status(500).json({ error: "Unable to load Showing List" });
    }
    else {
      if (notMobile) res.render('showing-list', { data: response.list });
      else res.status(200).json(response.list);
    }
  });
});

//Booking page for specific showing (Server rendered view or Json payload if mobile)
router.get('/:showingID', async (req, res) => {
  const showingID = Number(req.params.showingID);
  const notMobile = req.headers['app-type'] !== `mobile`;

  showingClient.GetShowingInfo({showingID: showingID}, (error:any, response:any) => {
    if(error) {
      if(notMobile) res.render('error', {errorCode: 404, errorMessage:"No showing available with provided identifier"});
      else res.status(404).json({ error: "No showing available with provided identifier" });
      return;
    }

    const showingData = response;

    ticketClient.GetSeatingInfo({showingID: showingID}, (error:any, response:any) => {
      if(error) {
        if(notMobile) res.render('error', {errorCode: 500, errorMessage:"Unable to load seating data"});
        else res.status(500).json({ error: "Unable to load seating data" });
        return;
      }

      if(notMobile) res.render('showing', { showingData: showingData, seatingData: {array:response.array, rowCount:response.rowCount, colCount:response.colCount} });
      else res.status(200).json({showingData: showingData, seatingData: response});
    });
  });
});

export default router;
