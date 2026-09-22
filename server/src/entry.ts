import express from 'express';
import showingsEndpoints from './endpoints/showings.js';
import ticketsEndpoints from './endpoints/tickets.js';
import serverEndpoints from './endpoints/server.js';
import moviesEndpoints from './endpoints/movies.js';

export const api = express();
const PORT = 5000;

// Middleware to handle JSON payloads
api.use(express.json());
api.use('/api/showings', showingsEndpoints);
api.use('/api/tickets', ticketsEndpoints);
api.use('/api/server', serverEndpoints);
api.use('/api/movies', moviesEndpoints);

api.listen(PORT, () => {
  console.log(`[Backend] API is running on http://localhost:${PORT}`);
});

api.set('view engine', 'ejs');
api.use(express.static('public'));

api.use((req, res) => {
  res.render('error', {errorCode: 404, errorMessage:"Unable to find page"});
});
