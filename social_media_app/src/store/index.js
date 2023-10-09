import { combineReducers } from "redux";
import users from './reducers/users';
import posts from './reducers/posts';
import comments from './reducers/comments';
import chats from './reducers/chats';

export default combineReducers({
    users,
    posts,
    comments,
    chats
});