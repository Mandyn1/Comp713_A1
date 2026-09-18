import express from 'express';
import { getShowingList } from './database';

export const api = express();
const PORT = 5000;

// Middleware to handle JSON payloads
api.use(express.json());

api.listen(PORT, () => {
  console.log(`[Backend] API is running on http://localhost:${PORT}`);
});

//General Movie List (Server rendered view)
api.get('/api/showings', async (req, res) => {
  res.json({ message: "Hello from the TypeScript Backend!" });

  const data = await getShowingList();
});

//Info in specific movie (Server rendered view)
api.get('/api/movies/:movieID', (req, res) => {
  const movieID = req.params.movieID;

  res.json({ message: "Hello from the TypeScript Backend!" });
});

//Booking page for specific movie (Server rendered view)
api.get('/api/showings/:showingID', (req, res) => {
  const showingID = req.params.showingID;

  res.json({ message: "Hello from the TypeScript Backend!" });
});

//Reserve seat and start release timer
api.get('/api/showings/:showingID/reserve', (req, res) => {
  const showingID = req.params.showingID;

  res.json({ message: "Hello from the TypeScript Backend!" });
});

//Release seat and end release timer (if no other seats are reserved)
api.get('/api/showings/:showingID/release', (req, res) => {
  const showingID = req.params.showingID;

  res.json({ message: "Hello from the TypeScript Backend!" });
});

//Confirm booking and end release timer
api.get('/api/showings/:showingID/confirm', (req, res) => {
  const showingID = req.params.showingID;

  res.json({ message: "Hello from the TypeScript Backend!" });
});
