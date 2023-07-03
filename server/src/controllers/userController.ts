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

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const { otp } = req.params
        if (!email || !password || !otp) return res.status(400);

        const user = await getUserByEmail(email).select('+password');
        if (!user) return res.status(400).json({ message: "user not found" })

        if (user.otp !== Number(otp)) return res.status(400).json({ message: "Invalid otp" })

        const expectedHash = await authentication(SALT, password)
        if (user.password !== expectedHash) return res.status(403).json({ message: "Invalid credentials" })

        user.verified = true
        await user.save()

        res.status(200).json({ message: "User has been successfully verified", user })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "An unexpected error occurred" });
    }
}