import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
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
    postId: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date
    }
});

const commentModel = mongoose.model('social_app_comment', commentSchema);

export default commentModel;