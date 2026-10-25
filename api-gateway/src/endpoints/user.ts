import express from 'express';
import helperFunction from '../helperfunctions';
import port from '../../../port-numbers.json'
import * as grpc from '@grpc/grpc-js';

const router = express.Router();

//Initiate grpc client
const userClient = new (helperFunction.getProto('user')).UserService(
  'localhost:' + port.user,
  grpc.credentials.createInsecure()
);

// Check username and password, then give a short-lived token for the admin view access
router.get('/signin/:username-with=:password', async (req, res) => {
  const username = String(req.params.username);
  const password = String(req.params.password);

  console.log("Sign in attempt: " + username);

  userClient.CheckSignIn({username: username, password: password}, (error:any, response:any) => {
    if(error){
      console.log("Sign in failed: " + username);
      res.status(401).json({ message: "Invalid username or password" });
    }

    userClient.CreateAdminToken({}, (error:any, response:any) => {
      if(error){
        console.log("Sign in failed: " + username);
        res.status(409).send("Unable to create admin token");
      }

      console.log("Sign in successful: " + username);
      res.status(200).json({ message: "Signed in!", token: response.token });
    });
  });
});

export default router;