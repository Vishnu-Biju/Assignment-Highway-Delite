import { Router } from "express";

import { register } from '../controllers/userController.js';

export default (router: Router) => {
    router.post('/register', register);
}