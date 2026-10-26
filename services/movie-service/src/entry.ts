import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import movieHandler from './handlers/movie';
import path from 'path';
import port from '../../../port-numbers.json'
import adminHandler from './handlers/admin';

const PORT = '0.0.0.0:' + port.movie; 
const protoPath = path.join(__dirname, '../../../protos/movie.proto');

//Format grpc
const packageDefinition = protoLoader.loadSync(protoPath, { keepCase: true, defaults: true });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const protoPackage = protoDescriptor.movie;

//Start grpc Server
const startServer = () => {
  const server = new grpc.Server();

  server.addService(protoPackage.MovieService.service, {
    GetMovieInfo: movieHandler.getMovieInfo,
    CreateMovie: adminHandler.createMovie,
    DeleteMovie: adminHandler.deleteMovie
  });
  
  server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, boundPort) => {
    if (err) {
      console.error(`Failed to start Movie Service: ${err.message}`);
      return;
    }
    console.log(`Movie Service is listening to port ${boundPort}`);
  });
};

startServer();
