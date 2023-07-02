import express from 'express';
import middleware from '../Auth/index.js';
import { createUser, getUser, login, getAllUsers, updateUser, updateUserFriend } from '../controller/user.js';

const routes = express.Router();

routes.post('/create', createUser);
routes.post('/login', login);
routes.get('/getAllUsers', getAllUsers);
routes.put('/updateUser', updateUser);
routes.put('/updateUserFriend', middleware, updateUserFriend);
routes.get('/id', getUser);

export default routes;