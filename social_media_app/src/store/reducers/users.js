import { SIGNIN, SIGNUP } from '../../actions/type';

const initialState = {
    users: [],
    user: {}
}


function users(state = initialState, action) {
    switch (action.type) {
        case SIGNUP:
            localStorage.setItem('profile', JSON.stringify(action.payload));
            return { ...state, user: action.payload.result };
        case SIGNIN:
            localStorage.setItem('profile', JSON.stringify(action.payload));
            return { ...state, user: action.payload.result };
        case 'ALL_USERS':
            return { ...state, users: action.payload };
        case 'USER':
            return { ...state, user: action.payload };
        case 'UPDATE':
            return { ...state, users: [...state.users.map(user => user._id === action.payload.result._id ? action.payload.result : user)] }
        default:
            return state;
    }
}

export default users;