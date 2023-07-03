import { Router } from "express";

import { register, signIn } from '../controllers/userController.js';

export default (router: Router) => {
    router.post('/register', register);
    router.post('/signin/:otp', signIn);
}