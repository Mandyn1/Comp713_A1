import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import ticketHandler from './handlers/ticket';
import path from 'path';
import port from '../../../port-numbers.json'

const PORT = '0.0.0.0:' + port.ticket;
const protoPath = path.join(__dirname, '../../../protos/ticket.proto');

//Format grpc
const packageDefinition = protoLoader.loadSync(protoPath, { keepCase: true, defaults: true });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const protoPackage = protoDescriptor.ticket;

//Start grpc Server
const startServer = () => {
  const server = new grpc.Server();

  server.addService(protoPackage.TicketService.service, {
    GetSeatingInfo: ticketHandler.processTicketData,
    CreateTicket: ticketHandler.createTicket,
    ReleaseTicket: ticketHandler.releaseTicket,
  });
  
  server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, boundPort) => {
    if (err) {
      console.error(`Failed to start Ticket Service: ${err.message}`);
      return;
    }
    console.log(`Ticket Service is listening to port ${boundPort}`);
  });
};

startServer();
