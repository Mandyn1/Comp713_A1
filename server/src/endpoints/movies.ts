import express from 'express';
import { getMovieInfo } from '../services/service-movies';
import { checkShowingID } from '../services/service-showings';

const router = express.Router();

//Info in specific movie (Server rendered view)
router.get('/:movieID-from-:senderID', async (req, res) => {
  const movieID = Number(req.params.movieID);
  const senderID = Number(req.params.senderID);

  const movieInfo = await getMovieInfo(movieID);
  const check = senderID == 0 ? true : await checkShowingID(senderID);

  if(!check) res.render('error', {errorCode: 404, errorMessage:"Invalid Sender Identifier"});
  else if(movieInfo == undefined){
    res.render('error', {errorCode: 404, errorMessage:"No movie available with provided identifier"});
  }
  else res.render('movie', { movieData: movieInfo, senderID: senderID });
  
});

export default router;
