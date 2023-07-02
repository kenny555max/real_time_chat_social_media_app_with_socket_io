import Comment from "../model/comment.js";

export const createComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);

        res.status(200).json(comment);
    } catch (error) {
        console.log(error);
    }
}

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().sort({ comment: -1 });
        
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
    }
}