import express, { json } from 'express';
import { checkConnection, getShowingList, reloadDatabase } from './database';

export const api = express();
const PORT = 5000;

// Middleware to handle JSON payloads
api.use(express.json());

api.listen(PORT, () => {
  console.log(`[Backend] API is running on http://localhost:${PORT}`);
});

api.set('view engine', 'ejs');
api.use(express.static('public'));

//General Movie List (Server rendered view)
api.get('/api/showings', async (req, res) => {
  const data = await getShowingList();

  //const jsonData = JSON.stringify(data);
  //res.json({ message: jsonData });

  await res.render('showings', { data: data });
});

//Info in specific movie (Server rendered view)
api.get('/api/movies/:movieID', (req, res) => {
  const movieID = Number(req.params.movieID);

  res.json({ message: "Hello from the TypeScript Backend!" });
});

//Booking page for specific movie (Server rendered view)
api.get('/api/showings/:showingID', (req, res) => {
  const showingID = Number(req.params.showingID);

  res.json({ message: "Hello from the TypeScript Backend!" });
});

//Reserve seat and start release timer
api.get('/api/showings/:showingID/reserve=:seatRow-:seatNumber', (req, res) => {
  const showingID = Number(req.params.showingID);
  const seatRow = req.params.seatRow;
  const seatNumber = Number(req.params.seatNumber);

  res.json({ message: "Hello from the TypeScript Backend!" });
});

//Release seat and end release timer (if no other seats are reserved)
api.get('/api/showings/:showingID/release=:seatID', (req, res) => {
  const showingID = Number(req.params.showingID);
  const seatID = Number(req.params.seatID);

  res.json({ message: "Hello from the TypeScript Backend!" });
});

//Confirm booking and end release timer
api.get('/api/showings/:showingID/confirm', (req, res) => {
  const showingID = Number(req.params.showingID);

  res.json({ message: "Hello from the TypeScript Backend!" });
});

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