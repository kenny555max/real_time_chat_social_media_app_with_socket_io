import axios from 'axios';
//const token = JSON.parse(localStorage.getItem('profile'))?.token;

//const api = axios.create({
  //  baseURL: 'http://localhost:5000/',
    //headers: {
      //  'Authorization': `Bearer ${token}`
    //}
//});

const API = axios.create({ baseURL: 'http://localhost:5000/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const createUser = (formData) => API.post(`users/create`, formData);
export const login = (formData) => API.post(`users/login`, formData);
export const updateUser = (formData) => API.put(`users/updateUser`, formData);
export const updateUserFriend = (data) => API.put(`users/updateUserFriend`, data);
export const getAllUsers = () => API.get(`users/getAllUsers`);
export const getUser = (id) => API.get(`users/${id}`);
export const createPost = (data) => API.post(`posts/createPost`, data);
export const getAllPosts = () => API.get('posts/getAllPosts');
export const updatePost = (data) => API.put('posts/updatePost', data);
export const createComment = (data) => API.post('comments/createComment', data);
export const getAllComments = () => API.get('comments/getAllComments');