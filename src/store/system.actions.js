
export function setHomePage(isHomePage) {
    return (dispatch) => dispatch({
        type: 'SET_HOME',
        isHomePage
    })
}

export function setLoadingStart() {
    return (dispatch) => dispatch({ type: 'LOADING_START' })
}

export function setLoadingDone() {
    return (dispatch) => dispatch({ type: 'LOADING_DONE' })
}

// added by Ariel - toggling modals:
export function toggleLoginModal(isModalSign) {
    return (dispatch) => {
        dispatch({ type: "TOGGLE_LOGIN_MODAL", isModalSign })
    }
}

export function toggleJoinModal(isJoinModal) {
    return (dispatch) => {
        dispatch({ type: "TOGGLE_JOIN_MODAL", isJoinModal })
    }
}
