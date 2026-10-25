import adminFunctions from "../functions/admin";
import {status as grpcStatus} from '@grpc/grpc-js';

const createShowing = (call: any, callback: any) => {
  
  console.log(`gRPC request: Admin  Showing Add`);

  adminFunctions.createShowing(call.request.movieID, call.request.date)
  .then((success) => {

    if(success == undefined) throw new Error("Unable to add showing");

    callback();
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
};

const deleteShowing = (call: any, callback: any) => {
  
  console.log(`gRPC request: Admin  Movie Showing`);

  adminFunctions.deleteShowing(call.request.showingID)
  .then((success) => {

    if(success == undefined) throw new Error("Unable to delete showing");

    callback();
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
};

const updateShowing = (call: any, callback: any) => {
  
  console.log(`gRPC request: Admin  Movie Showing`);

  adminFunctions.updateShowing(call.request.showingID, call.request.date)
  .then((success) => {

    if(success == undefined) throw new Error("Unable to update showing");

    callback();
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
};

const getAdminLists = (call: any, callback: any) => {
  
  console.log(`gRPC request: Admin  Movie Showing`);

  adminFunctions.getAdminLists()
  .then((success) => {

    if(success == undefined) throw new Error("Unable to update showing");

    callback(success);
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
};

const adminHandler = { createShowing, deleteShowing, updateShowing, getAdminLists };
export default adminHandler;
