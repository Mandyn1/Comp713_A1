import showingFunctions from "../functions/showing";
import {status as grpcStatus} from '@grpc/grpc-js';

const getShowingList = (call: any, callback: any) => {
  console.log(`gRPC request: Get Showing List`);

  showingFunctions.getShowingList()
  .then((success) => {

    if(success == undefined) throw new Error("Unable to get showing list");

    callback(success);
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
}

const getShowingInfo = (call: any, callback: any) => {
  
  console.log(`gRPC request: Get Showing Info`);

  showingFunctions.getShowingInfo(call.request.showingID)
  .then((success) => {

    if(success == undefined) throw new Error("Unable to get showing data");

    callback(success);
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
};

const checkShowingID = (call: any, callback: any) => {
  
  console.log(`gRPC request: Check Showing ID`);

  showingFunctions.checkShowingID(call.request.showingID)
  .then((success) => {

    callback(success);
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
};

const showingHandler = {getShowingList, getShowingInfo, checkShowingID};

export default showingHandler;