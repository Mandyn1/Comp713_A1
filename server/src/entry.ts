import express from 'express';
import { movieID } from './database';

export const api = express();
const PORT = 5000;

// Middleware to handle JSON payloads
api.use(express.json());

api.listen(PORT, () => {
  console.log(`[Backend] API is running on http://localhost:${PORT}`);
});

//General Movie List (Server rendered view)
api.get('/api/movies', (req, res) => {
  res.json({ message: "Hello from the TypeScript Backend!" });
});

//Info in specific movie (Server rendered view)
api.get('/api/movies/' + movieID, (req, res) => {
  res.json({ message: "Hello from the TypeScript Backend!" });
});

//Booking page for specific movie (Server rendered view)
api.get('/api/movies/' + movieID + '/booking', (req, res) => {
  res.json({ message: "Hello from the TypeScript Backend!" });
});

//Reserve seat and start release timer
api.get('/api/movies/' + movieID + '/booking/reserve', (req, res) => {
  res.json({ message: "Hello from the TypeScript Backend!" });
});

//Release seat and end release timer (if no other seats are reserved)
api.get('/api/movies/' + movieID + '/booking/release', (req, res) => {
  res.json({ message: "Hello from the TypeScript Backend!" });
});

//Confirm booking and end release timer
api.get('/api/movies/' + movieID + '/booking/confirm', (req, res) => {
  res.json({ message: "Hello from the TypeScript Backend!" });
});
