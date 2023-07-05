import { createUser, getUserByEmail } from '../models/user.js';
import { generateOTP } from '../helpers/index.js';
import { sendMail } from '../helpers/mailer.js';
// ...
export const register = async (req, res) => {
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
        await sendMail(`Please verify your email with ${process.env.CLIENT_URL}?otp=${otp}`, email, 'Mail verification');
        return res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
};
export const signIn = async (req, res) => {
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
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
};
// ...
export const submitOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Compare the provided OTP with the OTP in the database
        if (otp == user.otp) {
            // OTP is valid
            return res.status(200).json({ message: 'User has been successfully verified', user });
        }
        else {
            // Invalid OTP
            return res.status(403).json({ message: 'Invalid credentials' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
};
//# sourceMappingURL=userController.js.map