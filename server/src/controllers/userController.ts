import { Request, Response } from 'express'
import { createUser, getUserByEmail } from '../models/user.js';
import { authentication, generateOTP } from '../helpers/index.js';
import { sendMail } from '../helpers/mailer.js';

const SALT = process.env.SALT || 'PASSWORD_SALT';

export const register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, contactMode } = req.body

        if (!firstName || !lastName || !email || !password || !contactMode) return res.status(400).json({ message: 'Invalid request body' });

        const existingUser = await getUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: "User already exists" })

        const user = await createUser({
            firstName,
            lastName,
            password: authentication(SALT, password),
            contactMode,
            email,
            otp: generateOTP(),
            verified: false
        })

        await sendMail(`Please verify your email with the otp ${process.env.CLIENT_URL}/signup?otp=${user.otp}`, email, `Mail verification`)

        return res.status(201).json(user).end();
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "An unexpected error occurred" });
    }
}
