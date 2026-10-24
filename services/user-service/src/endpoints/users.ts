import express from 'express';
import { checkSignIn, createAdminToken } from '../services/service-users';

const router = express.Router();

// Check username and password, then give a short-lived token for the admin view access
router.get('/signin/:username-with=:password', async (req, res) => {
  const username = String(req.params.username);
  const password = String(req.params.password);

  console.log("Sign in attempt: " + username);

  const user = await checkSignIn(username, password);

  if(user !== undefined) {
    console.log("Sign in successful: " + username);
    res.status(200).json({ message: "Signed in!", token: createAdminToken() });
  }
  else {
    console.log("Sign in failed: " + username);
    res.status(401).json({ message: "Invalid username or password" });
  }
});

export default router;