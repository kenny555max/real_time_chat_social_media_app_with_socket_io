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
        dispatch({ type: 'isLoading', payload: true });
        const { data } = await api.createUser(formData);

        navigate('/lookalike/feeds');
        
        dispatch({ type: SIGNUP, payload: data });
        dispatch({ type: 'isLoading', payload: false });
    }
}

export const login = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const { data } = await api.login(formData);

            dispatch({ type: SIGNIN, payload: data });

            window.location = '/lookalike/feeds';
        } catch (error) {
            console.log(error);        
        }
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

export const getAllUsers = async () => {
    try {
        const { data } = await api.getAllUsers();

        return data;
    } catch (error) {
        console.log(error);
        return error;
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

export const getAllPosts = async () => {
    try {
        //dispatch({ type: 'isLoading_posts', payload: true });
        const { data } = await api.getAllPosts();

        return data;
        //dispatch({ type: 'isLoading_posts', payload: false });
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
    } catch (error) {
        console.log(error);
    }
}

export const createChat = (chatData) => async dispatch => {
    try {
        const { data } = await api.chat(chatData);
        console.log(data);
        dispatch({ type: 'CHAT', payload: data });
    } catch (error) {
        console.log(error);        
    }
}

export const getAllChats = async () => {
    try {
        const { data } = await api.getAllChats();

        //dispatch({ type: 'CHATS', payload: data })

        return data;
    } catch (error) {
        console.log(error);
    }
}