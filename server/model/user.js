import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: { type: String,required: true },
    email: { type: String, required: true },
    friends: { type: Array, default: [] },
    password: { type: String, required: true },
    coverImage: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    created_at: { type: Date, default: new Date },
    socketId: { type: String, default: "" },
    online: { type: Boolean, default: false }
});

const userModel = model('social_app_users', userSchema);

export default userModel;