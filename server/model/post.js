import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    userImage: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    friendsTagged: {
        type: Array,
        default: []
    },
    created_at: {
        type: Date,
        default: new Date
    },
    selectedFile: {
        type: String,
        require: true
    },
    like: {
        type: Array,
        default: []
    }
});

const postModel = mongoose.model('socialposts', postSchema);

export default postModel;