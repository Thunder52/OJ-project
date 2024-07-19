import express from 'express';
const authRouter=express.Router();
import { registerUser,loginUser } from '../Controllers/authController.js';

authRouter.post('/Register',registerUser);

authRouter.post('/',loginUser);

export default authRouter ;
