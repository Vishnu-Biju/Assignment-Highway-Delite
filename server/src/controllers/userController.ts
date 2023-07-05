import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../models/user.js';
import { authentication, generateOTP } from '../helpers/index.js';
import { sendMail } from '../helpers/mailer.js';



// ...

export const register = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password, contactMode } = req.body;
  
      if (!firstName || !lastName || !email || !password || !contactMode) {
        return res.status(400).json({ message: 'Invalid request body' });
      }
  
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const otp = generateOTP();
  
      const user = await createUser({
        firstName,
        lastName,
        password,
        contactMode,
        email,
        otp,
        verified: false,
      });
  
      await sendMail(
        `Please verify your email with ${CLIENT_URL}?otp=${otp}`,
        email,
        'Mail verification'
      );
  
      return res.status(201).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  };
  
  export const signIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      const user = await getUserByEmail(email);
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      if (user.password !== password) {
        return res.status(403).json({ message: 'Invalid credentials' });
      }
  
      return res.status(200).json({ message: 'User has been successfully verified', user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  };
  
  
  // ...
  
 export const submitOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const { otp } = req.params;
  
      if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
      }
  
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // ...
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  };
