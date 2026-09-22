import express from 'express';
import { reloadDatabase, checkConnection } from '../database-process';

const router = express.Router();

//Drops database and reloads from schema.sql and seed.sql
router.get('/datareload', async (req, res) => {

  if (await reloadDatabase() == true) res.status(200).json({ message: "Database reloaded!" });
  else res.status(500).json({ message: "Database reload failed!" });
});

router.get('/response', async (req, res) => {
  if(await checkConnection()) {
    res.status(500).json({ message: "Unable to connect to Database" });
  }
  else {
    res.status(200).json({ message: "Connected to Database" });
  }
});

export default router;