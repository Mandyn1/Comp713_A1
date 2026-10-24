import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import showingHandler from './handlers/showing';
import path from 'path';
import port from '../../../port-numbers.json'

const PORT = '0.0.0.0:' + port.showing;
const protoPath = path.join(__dirname, '../../../protos/showing.proto');

//Format grpc
const packageDefinition = protoLoader.loadSync(protoPath, { keepCase: true, defaults: true });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const protoPackage = protoDescriptor.showing;

//Start grpc Server
const startServer = () => {
  const server = new grpc.Server();

  server.addService(protoPackage.ShowingService.service, {
    GetShowingList: showingHandler.getShowingList,
    GetShowingInfo: showingHandler.getShowingInfo,
    CheckShowingID: showingHandler.checkShowingID
  });
  
  server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, boundPort) => {
    if (err) {
      console.error(`Failed to start Showing Service: ${err.message}`);
      return;
    }
    console.log(`Showing Service is listening to port ${boundPort}`);
  });
};

startServer();
