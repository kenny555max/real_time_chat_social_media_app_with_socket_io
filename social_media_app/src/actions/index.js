import * as api from '../api';
import { SIGNIN, SIGNUP } from './type';

const MAX_LOCAL_STORAGE_SIZE = 1024 * 1024; // 1 MB (example size limit)

function storeData(data) {
    const stringData = JSON.stringify(data);
    const dataSize = stringData.length;

    if (dataSize <= MAX_LOCAL_STORAGE_SIZE - localStorage.length) {
        console.log("Data size seems normal.");

        return true;
    }

    return false;
}

export const insertData = (formData, navigate) => {
    return async (dispatch) => {
        const { data } = await api.createUser(formData);

        navigate('/lookalike/feeds');
        
        dispatch({ type: SIGNUP, payload: data });
    }
}

export const login = (formData, navigate) => {
    return async (dispatch) => {
        const { data } = await api.login(formData);
        
        navigate('/lookalike/feeds');

        dispatch({ type: SIGNIN, payload: data });
    }
}

export const updateUser = (updateData) => async (dispatch) => {
    if (storeData(updateData)) {
        try {
            const { data } = await api.updateUser(updateData);
            
            dispatch({ type: 'UPDATE', payload: data });
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("Data size exceeds the available storage space.");
        // Handle the situation when the data size is too large.
    }
}

export const updateUserFriend = (updateData) => async (dispatch) => {
    try {
        const { data } = await api.updateUserFriend(updateData);

        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getAllUsers();
        
        dispatch({ type: 'ALL_USERS', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getUser = (id) => async dispatch => {
    try {
        const { data } = await api.getUser(id);
        
        dispatch({ type: 'USER', payload: data });
    } catch (error) {
        console.log(error);
    }
}


export const createPost = (postData) => async (dispatch) => {
    try {
        const { data } = await api.createPost(postData);
        
        dispatch({ type: 'CREATE_POST', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = () => async dispatch => {
    try {
        const { data } = await api.getAllPosts();

        dispatch({ type: 'ALL_POSTS', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (updateData) => async dispatch => {
    try {
        const { data } = await api.updatePost(updateData);
        console.log(data)
        dispatch({ type: 'UPDATE_POST', payload: { data, id: updateData.postid } });
    } catch (error) {
        console.log(error);
    }
}

export const createComment = (commentData) => async dispatch => {
    try {
        const { data } = await api.createComment(commentData);
        
        dispatch({ type: 'CREATE_COMMENT', payload: data._id });
    } catch (error) {
        console.log(error);
    }
}

export const getAllComments = async () => {
    try {
        const { data } = await api.getAllComments();
        return data;
        //dispatch({ type: 'ALL_COMMENTS', payload: data });
    } catch (error) {
        console.log(error);
    }
}