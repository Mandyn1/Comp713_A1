import express from 'express';
import { createTicket, deleteTicket } from '../database-process';

const router = express.Router();

//Reserve seat and start release timer
router.get('/reserve/:seatID-in=:showingID', async (req, res) => {
  const showingID = Number(req.params.showingID);
  const seatID = Number(req.params.seatID);

  const newTicket = await createTicket(showingID, seatID);

  if(newTicket !== undefined) res.status(201).send({ message: newTicket });
  else res.status(409).send("Unable to create ticket");
});

//Release seat and end release timer (if no other seats are reserved)
router.get('/release/:ticketID', async (req, res) => {
  const ticketID = Number(req.params.ticketID);
  await deleteTicket(ticketID);

  if(ticketID !== undefined) res.sendStatus(204);
  else res.status(409).send("Unable to delete ticket");
});

export default router;