

const initialState = {
    chats: []
}


function chats(state = initialState, action) {
    switch (action.type) {
        case 'CHAT':
            return { ...state, chats: [...state.chats, action.payload] }
        case 'CHATS':
            return { ...state, chats: action.payload}
        default:
            return state;
    }
}

export default chats;