import crypto from 'crypto';

const SECRET = process.env.PASSWORD_SECRET || 'LOGIN_PASSWORD_SECRET';

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

export const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
}