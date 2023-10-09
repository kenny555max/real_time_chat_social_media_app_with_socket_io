import express from 'express';
import { createChat, getAllChats } from '../controller/chat.js';
import middleware from '../Auth/index.js';

const routes = express.Router();

routes.post('/create', middleware, createChat);
routes.get('/getAllChats', getAllChats);

export default routes;