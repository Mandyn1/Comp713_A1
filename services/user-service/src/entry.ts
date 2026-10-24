import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import userHandler from './handlers/user';
import path from 'path';
import port from '../../../port-numbers.json'

const PORT = '0.0.0.0:' + port.user; 
const protoPath = path.join(__dirname, '../../../protos/user.proto');

//Format grpc
const packageDefinition = protoLoader.loadSync(protoPath, { keepCase: true, defaults: true });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const protoPackage = protoDescriptor.user;

//Start grpc Server
const startServer = () => {
  const server = new grpc.Server();

  server.addService(protoPackage.UserService.service, {
    CheckSignIn: userHandler.checkSignIn,
    CreateAdminToken: userHandler.createAdminToken,
    UseAdminToken: userHandler.useAdminToken
  });
  
  server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, boundPort) => {
    if (err) {
      console.error(`Failed to start User Service: ${err.message}`);
      return;
    }
    console.log(`User Service is listening to port ${boundPort}`);
  });
};

startServer();
