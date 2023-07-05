import mongoose from "mongoose";
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
});
export const User = mongoose.model('User', userSchema);
export const getUser = () => User.find();
export const getUserByEmail = (email) => User.findOne({ email });
export const getUserById = (id) => User.findById(id);
export const createUser = (values) => new User(values).save().then((user) => user.toObject());
export const findByIdAndUpdate = (id, values) => User.findByIdAndUpdate(id, values);
//# sourceMappingURL=user.js.map