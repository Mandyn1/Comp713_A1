import express from 'express';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const router = express.Router();

const protoPath = path.join(__dirname,'../../../protos/database.proto');

//Format grpc
const packageDefinition = protoLoader.loadSync(protoPath, { keepCase: true, defaults: true });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const protoPackage = protoDescriptor.database;

//Initiate grpc client
const databaseClient = new protoPackage.DatabaseService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

//Drops database and reloads from schema.sql and seed.sql
router.post('/datareload', async (req, res) => {

  databaseClient.DataReload({}, (err: any) => {
    if (err) return res.status(500).json({ message: "Database reload failed!" });
    return res.status(200).json({ message: "Database reloaded!" });
  });
});

//Checks if the database is available for interaction
router.get('/response', async (req, res) => {

  databaseClient.CheckConnection({}, (err: any) => {
    if (err) return res.status(500).json({ messsage: "Unable to connect to Database" });
    return res.status(200).json({ message: "Connected to Database" });
  });
});

export default router;