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

//General Showing List (Server rendered view)
router.get('/', async (req, res) => {
  showingClient.GetShowingList({}, (error:any, response:any) => {
    if(error) res.render('error', {errorCode: 500, errorMessage:"Unable to load Showing List"});
    else res.render('showing-list', { data: response.list });
  });
});

//showings list for mobile app to fetch all showings in json
router.get('/list', async (req, res) => {
  //for security using basic headers
  if(req.headers['app-type'] !== `mobile`){
    return res.render('error', {errorCode: 403, errorMessage:"Access Denied!"});
  }

  //get the showsing list, then check if data undefined, if not respond with json
  showingClient.GetShowingList({}, (error:any, response:any) => {
    if(error) return res.status(400).json({ error: "Client side error" })
    else{
      //return json response
      res.json(response);
    } 
  });
});

//Booking page for specific showing (Server rendered view)
router.get('/:showingID', async (req, res) => {
  const showingID = Number(req.params.showingID);

  showingClient.GetShowingInfo({showingID: showingID}, (error:any, response:any) => {
    if(error) {
      res.render('error', {errorCode: 404, errorMessage:"No showing available with provided identifier"});
      return;
    }

    const showingData = response;

    ticketClient.GetSeatingInfo({showingID: showingID}, (error:any, response:any) => {
      if(error) {
        res.render('error', {errorCode: 500, errorMessage:"Unable to load seating data"});
        return;
      }

      const seatingData = helperFunction.reconstructMatrix(response.array, response.rowCount, response.colCount);
      res.render('showing', { showingData: showingData, seatingData: {array:seatingData, rowCount:response.rowCount, colCount:response.colCount} });
    });
  });
});

//booking page for mobile app
router.get('/booking/:showingID', async (req, res) => {
  //header check
  if(req.headers['app-type'] !== `mobile`){
    return res.render('error', {errorCode: 403, errorMessage:"Access Denied!"});
  }

  const showingID = Number(req.params.showingID);

  showingClient.GetShowingInfo({showingID: showingID}, (error:any, response:any) => {
    if(error) {
      return res.status(404).json({ error: "Showing not found" })
    }

    const showingData = response;

    ticketClient.GetSeatingInfo({showingID: showingID}, (error:any, response:any) => {
      if(error) {
        return res.status(500).json({ error: "Server Side Error" })
      }
      res.json({showingData: showingData, seatingData: response});
    });
  });
})

export default router;
