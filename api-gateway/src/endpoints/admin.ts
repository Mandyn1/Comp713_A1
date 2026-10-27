import express, { response } from 'express';
import * as grpc from '@grpc/grpc-js';
import helperFunction from '../helperfunctions';
import port from '../../../port-numbers.json'

const router = express.Router();
const pageLifetime = 15 * 60 * 1000;

//Initiate grpc client
const userClient = new (helperFunction.getProto('user')).UserService(
  'localhost:' + port.user,
  grpc.credentials.createInsecure()
);

//Initiate grpc client
const movieClient = new (helperFunction.getProto('movie')).MovieService(
  'localhost:' + port.movie,
  grpc.credentials.createInsecure()
);

//Initiate grpc client
const showingClient = new (helperFunction.getProto('showing')).ShowingService(
  'localhost:' + port.showing,
  grpc.credentials.createInsecure()
);

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

  userClient.UseAdminToken({ token: req.params.token }, (error:any, response:any) => {
    if(error || !response.valid){
      res.redirect('/api/showings');
      return;
    }

    // Stops cache collecting - stops the browser from keeping a copy that the back button could abuse
    res.set('Cache-Control', 'no-store');
    userClient.CreateAdminToken({ lifetime: pageLifetime }, (error:any, response:any) => {
      if(error){
        console.log("Admin View Error");
        res.redirect('/api/showings');
        return;
      }

      res.render('admin-showing-list', { token: response.token });
    });
  });
});

router.use((req, res, next) => {
  userClient.UseAdminToken({ token: req.get('Admin-Token'), keepFor: pageLifetime }, (error:any, response:any) => {
    if(error || !response.valid){
      res.status(401).json({ message: "Not signed in" });
      return;
    }

    next();
  });
});

// Ends the page token
router.get('/signout', async (req, res) => {

  userClient.UseAdminToken({ token: req.get('Admin-Token') }, (error:any, response:any) => {
    res.status(200).json({ message: "Signed out!" });
  });
});

router.get('/lists', async (req, res) => {
  showingClient.GetAdminLists({ }, (error:any, response:any) => {
    if(error) {
      res.status(500).json({ message: "Unable to load lists" });
      return;
    }

    res.status(200).json(response);
  });
});

router.get('/add-movie/:movieName-type=:genre-by=:director', async (req, res) => {
  movieClient.CreateMovie({ name: req.params.movieName, genre: req.params.genre, director: req.params.director }, (error:any, response:any) => {
    let data;

    if(error) data = undefined;
    else data = response.rowID;

    reply(res, data, "Movie added!", "Unable to add movie");
  });
});

router.get('/delete-movie/:movieID', async (req, res) => {
  movieClient.DeleteMovie({ movieID: Number(req.params.movieID) }, (error:any, response:any) => {
    let data;

    if(error) data = undefined;
    else data = response.rowID;

    reply(res, data, "Movie deleted!", "Unable to delete movie");
  });
});

router.get('/add-showing/:movieID-on=:date', async (req, res) => {
  showingClient.CreateShowing({ movieID: Number(req.params.movieID), date: req.params.date }, (error:any, response:any) => {
    let data;

    if(error) data = undefined;
    else data = response;

    reply(res, data, "Showing added!", "Unable to add showing");
  });
});

router.get('/edit-showing/:showingID-to=:date', async (req, res) => {
  showingClient.UpdateShowing({ showingID: Number(req.params.showingID), date: req.params.date }, (error:any, response:any) => {
    let data;

    if(error) data = undefined;
    else data = response;

    reply(res, data, "Showing updated!", "Unable to update showing");
  });
});

router.get('/remove-showing/:showingID', async (req, res) => {
  showingClient.DeleteShowing({ showingID: Number(req.params.showingID) }, (error:any, response:any) => {
    let data;

    if(error) data = undefined;
    else data = response;

    reply(res, data, "Showing removed!", "Unable to remove showing");
  });
});

export default router;