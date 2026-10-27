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

//Checks if the database is available for interaction
router.get('/response', async (req, res) => {

  databaseClient.CheckConnection({}, (error: any, response:any) => {
    if (error) return res.status(500).json({ message: error.details});
    return res.status(200).json({ message: "Connected to Database" });
  });
});

export default router;