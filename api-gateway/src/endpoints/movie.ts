import express from 'express';
import * as grpc from '@grpc/grpc-js';
import helperFunction from '../helperfunctions';
import port from '../../../port-numbers.json'

const router = express.Router();

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

//Info in specific movie (Server rendered view)
router.get('/:movieID-from-:senderID', async (req, res) => {
  const movieID = Number(req.params.movieID);
  const senderID = Number(req.params.senderID);
  
  movieClient.GetMovieInfo({ movieID: movieID }, (error:any, response:any) => {
    if(error) { 
      res.render('error', {errorCode: 404, errorMessage:"No movie available with provided identifier"});
      return;
    }
    if(senderID == 0) {
      res.render('movie', { movieData: response, senderID: senderID });
      return;
    }

    else{
      showingClient.CheckShowingID({ showingID: senderID }, (error:any) => {
        if(error) res.render('error', {errorCode: 404, errorMessage:"Invalid Sender Identifier"});
        else res.render('movie', { movieData: response, senderID: senderID });
      });
    }
  });  
});

export default router;
