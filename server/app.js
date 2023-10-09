import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import commentRoutes from './routes/comment.js';
import chatRoutes from './routes/chat.js';
import PostModel from './model/post.js';

import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

app.use(morgan('tiny'));
//built-in middleware in express
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '30mb' })); // this allows to pass json payload from the frontend to backend

app.use(cors());

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server running on ${PORT}`))
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('posted', ({ username, email }) => {
        socket.broadcast.emit('notification', { message: `${username} with the email ${email} just posted` });
    });

    // Set up change stream for the specific collection
    const changeStream = PostModel.watch();

    changeStream.on('change', (change) => {
        // Emit the change to the connected client
        socket.emit('dataChange', change);
    });

    socket.on('disconnect', async () => {
        console.log('User disconnected');

        // Clean up resources, if necessary
        changeStream.close();
    });
});

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/chat', chatRoutes);

const PORT = process.env.PORT || 4000;