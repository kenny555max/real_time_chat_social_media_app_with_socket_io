import Post from "../model/post.js";

export const createPost = async (req, res) => {
    try {
        if (req.body.userId !== req.userId) res.status(400).json({ msg: 'This user is not authorized!' });

        const posts = await Post.create(req.body);

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = async (req, res) => {
    try {
        if (req.userId !== req.body.userId) res.status(400).json({ msg: 'You are unAuthorized!' });

        const post = await Post.findOne({ _id: req.body.postid });

        const userLike = post.like.find(like => like === req.body.userId);
        
        if (userLike) {
            post.like = post.like.filter(like => like !== req.body.userId);
        } else {
            post.like.push(req.body.userId);
        }

        const newPost = await Post.findByIdAndUpdate({ _id: req.body.postid }, { ...post, like: post.like }, { new: true });
        console.log(newPost);
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
    }
}