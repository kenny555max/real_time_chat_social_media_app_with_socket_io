import express from 'express';
import { createComment, getAllComments } from '../controller/comment.js';

const routes = express.Router();

routes.post('/createComment', createComment);
routes.get('/getAllComments', getAllComments)

export default routes;