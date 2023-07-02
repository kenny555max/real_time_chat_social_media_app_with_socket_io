

const initialState = {
    posts: [],
    post: {}
}


function posts(state = initialState, action) {
    switch (action.type) {
        case 'CREATE_POST':
            return { ...state, posts: [ action.payload, ...state.posts] }
        case 'ALL_POSTS':
            return { ...state, posts: [...action.payload] }
        case 'UPDATE_POSTS':
            return { ...state, posts: [...state.posts.map(post => post._id === action.payload.id ? action.payload.data : post)] }
        default:
            return state;
    }
}

export default posts;