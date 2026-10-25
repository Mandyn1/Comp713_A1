import express from 'express';
import * as grpc from '@grpc/grpc-js';
import helperFunction from '../helperfunctions';
import port from '../../../port-numbers.json'

const router = express.Router();

//Initiate grpc client
const databaseClient = new (helperFunction.getProto('database')).DatabaseService(
  'localhost:' + port.database,
  grpc.credentials.createInsecure()
);

//Drops database and reloads from schema.sql and seed.sql
router.post('/datareload', async (req, res) => {

  databaseClient.DataReload({}, (error: any) => {
    if (error) return res.status(500).json({ message: "Database reload failed!" });
    return res.status(200).json({ message: "Database reloaded!" });
  });
});

//Checks if the database is available for interaction
router.get('/response', async (req, res) => {

  databaseClient.CheckConnection({}, (error: any) => {
    if (error) return res.status(500).json({ messsage: "Unable to connect to Database" });
    return res.status(200).json({ message: "Connected to Database" });
  });
});

export default router;