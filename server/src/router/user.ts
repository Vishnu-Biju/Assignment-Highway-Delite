import { Router } from "express";
import { register, signIn, submitOTP } from '../controllers/userController.js';

export default (router: Router) => {
  router.post('/register', register);
  
  router.post('/signin', signIn);
  
  router.post('/signin/:otp', submitOTP);

}

