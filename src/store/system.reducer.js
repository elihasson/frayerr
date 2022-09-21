const initialState = {
    isLoading: false,
    isHome: false,
    // Modals Initial States - Added By Ariel:
    isModalSign: false,
    isJoinModal: false
}

export function systemReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'LOADING_START':
            return { ...state, isLoading: true }
        case 'LOADING_DONE':
            return { ...state, isLoading: false }
        case 'SET_HOME':
            return { ...state, isHome: action.isHomePage }
        // Modals Actions - Added By Ariel:
        case "TOGGLE_LOGIN_MODAL":
            return { ...state, isModalSign: !state.isModalSign, isJoinModal: false }
        case "TOGGLE_JOIN_MODAL":
            return { ...state, isJoinModal: !state.isJoinModal, isModalSign: false}   
        default: return state
    }
}
