import express from 'express';
import { checkConnection, createTicket, deleteTicket, getSeatingInfo, getShowingInfo, getShowingList, getTicketInfo, processTicketData, reloadDatabase } from './database-process';

export const api = express();
const PORT = 5000;

// Middleware to handle JSON payloads
api.use(express.json());

api.listen(PORT, () => {
  console.log(`[Backend] API is running on http://localhost:${PORT}`);
});

api.set('view engine', 'ejs');
api.use(express.static('public'));

//Drops database and reloads from schema.sql and seed.sql
api.get('/api/datareload', async (req, res) => {

  if (await reloadDatabase() == true) res.json({ message: "Database reloaded!" });
  else res.json({ message: "Database reload failed!" });
});

api.get('/api/response', async (req, res) => {
  if(await checkConnection()) {
    res.status(500).json({ message: "Unable to connect to Database" });
  }
  else {
    res.status(200).json({ message: "Connected to Database" });
  }
});

//Reserve seat and start release timer
api.get('/api/showings/:showingID/reserve=:seatID', async (req, res) => {
  const showingID = Number(req.params.showingID);
  const seatID = Number(req.params.seatID);

  const newTicket = await createTicket(showingID, seatID);
  res.status(201).send({ message: newTicket });
});

//Release seat and end release timer (if no other seats are reserved)
api.get('/api/showings/release=:ticketID', async (req, res) => {
  const ticketID = Number(req.params.ticketID);
  await deleteTicket(ticketID);

  res.sendStatus(204);
});

//Info in specific movie (Server rendered view)
api.get('/api/movies/:movieID', async (req, res) => {
  const movieID = Number(req.params.movieID);
  
});

//Booking page for specific showing (Server rendered view)
api.get('/api/showings/:showingID', async (req, res) => {
  const showingID = Number(req.params.showingID);
  const showingData = await getShowingInfo(showingID);
  const seatingData = processTicketData(await getSeatingInfo(), await getTicketInfo(showingID));

  res.render('showing', { showingData: showingData, seatingData: seatingData });
});

//General Showing List (Server rendered view)
api.get('/api/showings', async (req, res) => {
  const data = await getShowingList();

  await res.render('showing-list', { data: data });
});
