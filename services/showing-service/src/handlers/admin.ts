import adminFunctions from "../functions/admin";
import {status as grpcStatus} from '@grpc/grpc-js';

const createShowing = (call: any, callback: any) => {
  
  console.log(`gRPC request: Admin Create Showing`);

  adminFunctions.createShowing(call.request.movieID, call.request.date)
  .then((success) => {

    if(success == undefined) throw new Error("Unable to add showing");

    callback(null);
  })
  .catch((error:any) =>{
    callback({code:grpcStatus.ABORTED, details:error});
  })
};

const deleteShowing = (call: any, callback: any) => {
  
  console.log(`gRPC request: Admin Delete Showing`);

  adminFunctions.deleteShowing(call.request.showingID)
  .then((success) => {

    if(success == undefined) throw new Error("Unable to delete showing");

    callback(null);
  })
  .catch((error:any) =>{
    callback({code:grpcStatus.ABORTED, details:error});
  })
};

const updateShowing = (call: any, callback: any) => {
  
  console.log(`gRPC request: Admin Update Showing`);

  adminFunctions.updateShowing(call.request.showingID, call.request.date)
  .then((success) => {

    if(success == undefined) throw new Error("Unable to update showing");

    callback(null);
  })
  .catch((error:any) =>{
    callback({code:grpcStatus.ABORTED, details:error});
  })
};

const getAdminLists = (call: any, callback: any) => {
  
  console.log(`gRPC request: Admin List`);

  adminFunctions.getAdminLists()
  .then((success) => {

    if(success == undefined) throw new Error("Unable to get admin list");

    callback(success);
  })
  .catch((error:any) =>{
    callback({code:grpcStatus.ABORTED, details:error});
  })
};

const adminHandler = { createShowing, deleteShowing, updateShowing, getAdminLists };
export default adminHandler;
