import express from 'express';
import { getSeatingInfo } from '../services/service-seats';
import { getShowingList } from '../services/service-showing-list';
import { getShowingInfo } from '../services/service-showings';
import { processTicketData, getTicketInfo } from '../services/service-tickets';

const router = express.Router();

//General Showing List (Server rendered view)
router.get('/', async (req, res) => {
  const data = await getShowingList();

  if(data == undefined) res.render('error', {errorCode: 500, errorMessage:"Unable to load Showing List"});
  else{
    await res.render('showing-list', { data: data });
  } 
});

//showings list for mobile app to fetch all showings in json
router.get('/list', async (req, res) => {
  //for security using basic headers
  if(req.headers['app-type'] !== `mobile`){
    return res.render('error', {errorCode: 403, errorMessage:"Access Denied!"});
  }

  //get the showsing list, then check if data undefined, if not respond with json
  const data = await getShowingList();

  if(data == undefined) return res.statusCode = 400;
  else{
    //return json response
    res.json(data);
  } 
});

//Booking page for specific showing (Server rendered view)
router.get('/:showingID', async (req, res) => {
  const showingID = Number(req.params.showingID);
  const showingData = await getShowingInfo(showingID);
  const seatingPreProcessInfo = await getSeatingInfo();

  if(showingData == undefined) res.render('error', {errorCode: 404, errorMessage:"No showing available with provided identifier"});
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
  if(showingData == undefined) return res.statusCode = 404;
  else if(seatingPreProcessInfo !== undefined){
    //get the seating data then parse into json
    const seatingData = processTicketData(seatingPreProcessInfo, await getTicketInfo(showingID));
    res.json({showingData: showingData, seatingData: seatingData});
  }
  else{
    return res.statusCode = 500;
  }

})

export default router;