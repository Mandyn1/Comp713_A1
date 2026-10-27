import movieFunctions from "../functions/movie";
import {status as grpcStatus} from '@grpc/grpc-js';

const getMovieInfo = (call: any, callback: any) => {
  
  console.log(`gRPC request: Get Movie Info`);

  movieFunctions.getMovieInfo(call.request.movieID)
  .then((success) => {

    if(success == undefined) throw new Error("Unable to get movie data");

    callback(null, success);
  })
  .catch((error:any) =>{
    callback({code:grpcStatus.ABORTED, details:error});
  })
};

const movieHandler = {getMovieInfo};

export default movieHandler;