const initialState = {
    isAuthenticated: false,
    uid:0
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'ON_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: action.token != null ? true : false,
                uid: action.id
                }
        case 'LOGOUT':
        return {
            ...state,
            isAuthenticated: false
        }
    }

    return state
}

export default reducer