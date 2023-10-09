import { SIGNIN, SIGNUP } from '../../actions/type';

const initialState = {
    users: [],
    user: {},
    isLoading: false,
    socket: null
}

function users(state = initialState, action) {
    switch (action.type) {
        case 'isLoading':
            return { ...state, isLoading: action.payload }
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
            localStorage.setItem('profile', JSON.stringify(action.payload));
            return { ...state, users: [...state.users.map(user => user._id === action.payload.result._id ? action.payload.result : user)] }
        case 'SOCKET_REDUCER':
            return { ...state, socket: action.payload }
        default:
            return state;
    }
}

export default users;