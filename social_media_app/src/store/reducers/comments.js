

const initialState = {
    comments: [],
    comment: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_COMMENT':
            return { ...state, comments: [action.payload, ...state.comments] }
        case 'ALL_COMMENTS':
            return { ...state, comments: [...action.payload] }
        default:
            return state;
    }
}

export default reducer;