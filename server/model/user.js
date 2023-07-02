import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    friends: {
        type: Array,
        default: []
    },
    password: {
        type: String,
    },
    coverImage: {
        type: String
    },
    profileImage: {
        type: String
    },
    created_at: {
        type: Date,
        default: new Date
    }
});

const userModel = model('user', userSchema);

export default userModel;