import mongoose from 'mongoose';

const chatbox_schema = new mongoose.Schema({
    sender_id: {
        type: String,
        require: true
    },
    receiver_id: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        default: new Date
    },
    chat: {
        type: String,
        require: true
    }
});

const chatbox_model = mongoose.model('social_app_chatbox', chatbox_schema);

export default chatbox_model;