import mongoose from "mongoose";

interface IUser {
    firstName: string;
    lastName: string;
    password: string;
    contactMode: string;
    email: string;
    otp: number;
    verified: boolean;
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    contactMode: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    verified: {
        type: Boolean,
        required: true,
    }
})

export const User = mongoose.model('User', userSchema)

export const getUser = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserById = (id: string) => User.findById(id);

export const createUser = (values: IUser) => new User(values).save().then((user) => user.toObject());
export const findByIdAndUpdate = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values);