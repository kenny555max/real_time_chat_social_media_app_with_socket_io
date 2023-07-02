import express from "express";
import { createPost, getAllPosts, updatePost } from '../controller/post.js';
import middleware from "../Auth/index.js";

const routes = express.Router();

routes.post('/createPost', middleware, createPost);
routes.get('/getAllPosts', getAllPosts);
routes.put('/updatePost', middleware, updatePost);

export default routes;