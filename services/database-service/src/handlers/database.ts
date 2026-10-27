import dbFunctions from "../functions/database";
import {status as grpcStatus} from '@grpc/grpc-js';

const dataReload = (call: any, callback: any) => {
  
  console.log(`gRPC request: Data Reload`);

  dbFunctions.reloadDatabase()
  .then((success) => {
    if(!success) throw new Error("Error reloading database");
    callback(null);
  })
  .catch((error:any) =>{
    callback({code:grpcStatus.ABORTED, details:error});
  })
};

const checkConnection = (call: any, callback: any) => {
  
  console.log(`gRPC request: Check Connection`);

  dbFunctions.checkConnection()
  .then((success) => {
    if(!success) throw new Error("Unable to connect to database");
    callback(null);
  })
  .catch((error:any) =>{
    callback({code:grpcStatus.UNAVAILABLE, details:String(error)});
  })
};

const dbHandler = {dataReload, checkConnection};

export default dbHandler;