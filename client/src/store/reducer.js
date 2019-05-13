const initialState = {
    isAuthenticated: false
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'ON_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: action.token != null ? true : false            
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