import { getSeatingInfo, getShowingInfo, getShowingList, getTicketInfo, processTicketData } from "../database-process";
import express from 'express';

const router = express.Router();

//General Showing List (Server rendered view)
router.get('/', async (req, res) => {
  const data = await getShowingList();

  if(data == undefined) res.render('error', {errorCode: 500, errorMessage:"Unable to load Showing List"});
  else await res.render('showing-list', { data: data });
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

export default router;
