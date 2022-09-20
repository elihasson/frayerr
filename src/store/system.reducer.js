const initialState = {
    isLoading: false,
    isHome: false,
}

export function systemReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'LOADING_START':
            return { ...state, isLoading: true }
        case 'LOADING_DONE':
            return { ...state, isLoading: false }
        case 'SET_HOME':
            return {...state, isHome: action.isHomePage}
        default: return state
    }
}
