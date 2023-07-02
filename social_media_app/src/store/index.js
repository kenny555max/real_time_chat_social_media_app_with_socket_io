import { combineReducers } from "redux";
import users from './reducers/users';
import posts from './reducers/posts';
import comments from './reducers/comments';

export default combineReducers({
    users,
    posts,
    comments
});