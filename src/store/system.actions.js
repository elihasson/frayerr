
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
export function toggleLoginModal() {
    return (dispatch) => {
        dispatch({ type: "TOGGLE_LOGIN_MODAL" })
    }
}

export function toggleJoinModal() {
    return (dispatch) => {
        dispatch({ type: "TOGGLE_JOIN_MODAL" })
    }
}

export function closeLoginJoinModal() {
    return (dispatch) => {
        dispatch({ type: "CLOSE_LOGIN_JOIN_MODAL" })
    }
}

export function setIsNewOrder(isNewOrder) {
    return (dispatch) => {
        dispatch({ type: "SET_IS_NEW_ORDER" , isNewOrder  })
    }
}
