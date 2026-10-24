import movieFunctions from "../functions/movie";
import {status as grpcStatus} from '@grpc/grpc-js';

const getMovieInfo = (call: any, callback: any) => {
  
  console.log(`gRPC request: Get Movie Info`);

  movieFunctions.getMovieInfo(call.request.movieID)
  .then((success) => {

    if(success == undefined) throw new Error("Unable to get movie data");

    callback(success);
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
};

const movieHandler = {getMovieInfo};

export default movieHandler;