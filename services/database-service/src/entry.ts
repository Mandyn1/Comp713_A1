import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import dbHandler from './handlers/database';
import path from 'path';

const PORT = '0.0.0.0:50051'; 
const protoPath = path.join(__dirname, '../../../protos/database.proto');

//Format grpc
const packageDefinition = protoLoader.loadSync(protoPath, { keepCase: true, defaults: true });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const protoPackage = protoDescriptor.database;

//Start grpc Server
const startServer = () => {
  const server = new grpc.Server();

  server.addService(protoPackage.DatabaseService.service, {
    DataReload: dbHandler.dataReload,
    CheckConnection: dbHandler.checkConnection
  });
  
  server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, boundPort) => {
    if (err) {
      console.error(`Failed to start Database Service: ${err.message}`);
      return;
    }
    console.log(`Database Service is listening to port ${boundPort}`);
  });
};

startServer();
