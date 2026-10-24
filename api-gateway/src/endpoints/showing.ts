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

//General Showing List (Server rendered view)
router.get('/', async (req, res) => {
  showingClient.GetShowingList({}, (error:any, response:any) => {

    if(error) res.render('error', {errorCode: 500, errorMessage:"Unable to load Showing List"});
    else res.render('showing-list', { data: response });
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

  showingClient.GetShowingList({showingID: showingID}, (error:any, response:any) => {
    if(error) {
      res.render('error', {errorCode: 404, errorMessage:"No showing available with provided identifier"});
      return;
    }
    
  });
  
  //const showingData = await getShowingInfo(showingID);
  const seatingPreProcessInfo = await getSeatingInfo();

  //if(showingData == undefined) res.render('error', {errorCode: 404, errorMessage:"No showing available with provided identifier"});
  else if(seatingPreProcessInfo !== undefined){
    const seatingData = processTicketData(seatingPreProcessInfo, await getTicketInfo(showingID));
    res.render('showing', { showingData: showingData, seatingData: seatingData });
  }
  else{
    res.render('error', {errorCode: 500, errorMessage:"Server error"});
  }
});

//booking page for mobile app
router.get('/booking/:showingID', async (req, res) => {
  //header check
  if(req.headers['app-type'] !== `mobile`){
    return res.render('error', {errorCode: 403, errorMessage:"Access Denied!"});
  }

  //get the showing id from the parsed value, then get showing data and seating info
  const showingID = Number(req.params.showingID);
  const showingData = await getShowingInfo(showingID);
  const seatingPreProcessInfo = await getSeatingInfo();

  //check if showing data is correct, if not rendor error
  if(showingData == undefined) return res.status(404).json({ error: "Showing not found" })
  else if(seatingPreProcessInfo !== undefined){
    //get the seating data then parse into json
    const seatingData = processTicketData(seatingPreProcessInfo, await getTicketInfo(showingID));
    res.json({showingData: showingData, seatingData: seatingData});
  }
  else{
    return res.status(500).json({ error: "Server Side Error" })
  }

})

export default router;