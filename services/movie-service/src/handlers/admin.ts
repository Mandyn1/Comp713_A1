import adminFunctions from "../functions/admin";
import {status as grpcStatus} from '@grpc/grpc-js';

const createMovie = (call: any, callback: any) => {
  
  console.log(`gRPC request: Admin  Movie Add`);

  adminFunctions.createMovie(call.request.name, call.request.genre, call.request.director)
  .then((success) => {

    if(success == undefined) throw new Error("Unable to add movie");

    callback();
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
};

const deleteMovie = (call: any, callback: any) => {
  
  console.log(`gRPC request: Admin  Movie Delete`);

  adminFunctions.deleteMovie(call.request.movieID,)
  .then((success) => {

    if(success == undefined) throw new Error("Unable to delete movie");

    callback();
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
};

const adminHandler = { createMovie, deleteMovie };
export default adminHandler;
