import dbFunctions from "../functions/database";
import {status as grpcStatus} from '@grpc/grpc-js';

const dataReload = (call: any, callback: any) => {
  
  console.log(`gRPC request: Data Reload`);

  dbFunctions.reloadDatabase()
  .then((success) => {
    callback(null);
  })
  .catch(() =>{
    callback(grpcStatus.ABORTED);
  })
};

const checkConnection = (call: any, callback: any) => {
  
  console.log(`gRPC request: Check Connection`);

  dbFunctions.checkConnection()
  .then((success) => {
    callback(null);
  })
  .catch(() =>{
    callback(grpcStatus.UNAVAILABLE);
  })
};

const dbHandler = {dataReload, checkConnection};

export default dbHandler;