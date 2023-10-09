import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
    try {
        const checkForUserExistence = await User.findOne({ email: req.body.email });

        if (checkForUserExistence) return res.status(400).json({ msg: `User with the email ${req.body.email} already exist in the database!` });

        //encypt password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(req.body.password, salt);

        const result = await User.create({ ...req.body, password: hash });

        const token = jwt.sign({ email: result.email, _id: result._id }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ token, result });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const result = await User.findOne({ email: req.body.email });
        
        if (!result) return res.status(400).json({ msg: `User with the email of ${req.body.email} does not exist in the database!` });

        const hash = result.password;

        const confirmPassword = await bcrypt.compare(req.body.password, hash);

        if (!confirmPassword) return res.status(400).json({ msg: `Incorrect password!` });

        const token = jwt.sign({ email: result.email, _id: result._id }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ result, token });
    } catch (error) {
        console.log(error);
    }
}

export const updateUserFriend = async (req, res) => {
    try {
        if (req.userId !== req.body.loggedInUserId) res.status(400).json({ msg: 'You are not Authorized' });

        const user = await User.findOne({ _id: req.body.loggedInUserId });

        const already_friends = user.friends.find(friendId => friendId === req.body.friendId);

        if (already_friends) {
            user.friends = user.friends.filter(friendId => friendId !== req.body.friendId);
        } else {
            user.friends.push(req.body.friendId);
        }

        const result = await User.findByIdAndUpdate({ _id: req.body.loggedInUserId }, user, { new: true });

        const token = jwt.sign({ email: result.email, _id: result._id }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ result, token });
    } catch (error) {
        console.log(error);
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (req, res) => {
    try {
        const { coverImage, profileImage } = req.body;
        
        const result = await User.findByIdAndUpdate({ _id: req.body.id }, { coverImage, profileImage }, { new: true });
        
        const token = jwt.sign({ email: result.email, _id: result._id }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ result, token });
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}