import express from 'express';
import { createMovie, createShowing, deleteMovie, deleteShowing, getAdminLists, updateShowing } from '../services/service-admin';
import { createAdminToken, useAdminToken } from '../services/service-users';

const router = express.Router();
const pageLifetime = 15 * 60 * 1000;

// Formatting all dates to match yyyy-mm-dd
router.param('date', (req, res, next, date) => {
  if(/^\d{4}-\d{2}-\d{2}$/.test(date)) next();
  else res.status(400).json({ message: "Invalid date" });
});

// Reply for a change, result is what the service gave back
function reply(res:express.Response, result:{ insertId:number }|undefined, done:string, failed:string) {
  if(result !== undefined) res.status(200).json({ message: done, id: result.insertId });
  else res.status(409).json({ message: failed });
}

// Admin View (Server rendered view, needs the one time token given at sign in)
// The page is given its own token, which it sends with every request below
router.get('/view/:token', async (req, res) => {
  if(useAdminToken(String(req.params.token))) {
    // Stops cache collecting - stops the browser from keeping a copy that the back button could abuse
    res.set('Cache-Control', 'no-store');
    await res.render('admin-showing-list', { token: createAdminToken(pageLifetime) });
  }
  else res.redirect('/api/showings');
});

router.use((req, res, next) => {
  if(useAdminToken(String(req.get('Admin-Token')), pageLifetime)) next();
  else res.status(401).json({ message: "Not signed in" });
});

// Ends the page token
router.get('/signout', async (req, res) => {
  useAdminToken(String(req.get('Admin-Token')));
  res.status(200).json({ message: "Signed out!" });
});

router.get('/lists', async (req, res) => {
  const data = await getAdminLists();

  if(data !== undefined) res.status(200).json(data);
  else res.status(500).json({ message: "Unable to load lists" });
});

router.get('/add-movie/:movieName-type=:genre-by=:director', async (req, res) => {
  reply(res, await createMovie(String(req.params.movieName), String(req.params.genre), String(req.params.director)), "Movie added!", "Unable to add movie");
});

router.get('/delete-movie/:movieID', async (req, res) => {
  reply(res, await deleteMovie(Number(req.params.movieID)), "Movie deleted!", "Unable to delete movie");
});

router.get('/add-showing/:movieID-on=:date', async (req, res) => {
  reply(res, await createShowing(Number(req.params.movieID), String(req.params.date)), "Showing added!", "Unable to add showing");
});

router.get('/edit-showing/:showingID-to=:date', async (req, res) => {
  reply(res, await updateShowing(Number(req.params.showingID), String(req.params.date)), "Showing updated!", "Unable to update showing");
});

router.get('/remove-showing/:showingID', async (req, res) => {
  reply(res, await deleteShowing(Number(req.params.showingID)), "Showing removed!", "Unable to remove showing");
});

export default router;