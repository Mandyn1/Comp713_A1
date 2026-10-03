import express from 'express';
import { checkSignIn } from '../services/service-users';

const router = express.Router();

// Check username and password
router.get('/:username-with=:password', async (req, res) => {
  const username = String(req.params.username);
  const password = String(req.params.password);

  if(await checkSignIn(username, password) == true) res.status(200).json({ message: "Signed in!" });
  else res.status(401).json({ message: "Invalid username or password" });
});

export default router;