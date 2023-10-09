import Chat from '../model/chatbox.js';

export const createChat = async (req, res) => {
    try {
        if (!req.userId) res.status(400).json({ msg: 'You are not Authorized' });

        const chat = await Chat.create(req.body);

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
    }
}

export const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find();

        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
    }
}