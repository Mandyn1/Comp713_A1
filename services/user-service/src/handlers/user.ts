import userFunctions from "../functions/user";
import {status as grpcStatus} from '@grpc/grpc-js';

const checkSignIn = (call: any, callback: any) => {
    console.log(`gRPC request: Check Sign In`);

  userFunctions.checkSignIn(call.request.username, call.request.password)
  .then((success) => {
    if(success == undefined) throw new Error("Unable to sign in");

    callback(null);
  })
  .catch((error:any) =>{
    callback({code:grpcStatus.PERMISSION_DENIED, details:error});
  })
}

const createAdminToken = (call: any, callback: any) => {
    console.log(`gRPC request: Create Admin Token`);
    try{
      const lifetime = (call.request.lifetime !== undefined && call.request.lifetime !== null) 
      ? call.request.lifetime 
      : 60 * 1000;

      const token = userFunctions.createAdminToken(lifetime);
      callback(null, {token:token});
    }
    catch(error:any){
      callback({code:grpcStatus.ABORTED, details:error});
    }
}

const useAdminToken = (call: any, callback: any) => {
    console.log(`gRPC request: Use Admin Token`);
    try{
      const keepFor = (call.request.keepFor !== undefined && call.request.keepFor !== null) 
      ? call.request.keepFor 
      : 0;

      const token = userFunctions.useAdminToken(call.request.token, keepFor);

      callback(null, {valid:token});
    }
    catch(error:any){
      callback({code:grpcStatus.ABORTED, details:error});
    }
}

const userHandler = { checkSignIn, createAdminToken, useAdminToken };

export default userHandler;
