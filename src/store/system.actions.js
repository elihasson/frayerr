
export function setHomePage(isHomePage) {
    return (dispatch) => dispatch( {
        type: 'SET_HOME',
        isHomePage
    })
}

export function setLoadingStart() {
    return (dispatch) => dispatch( { type: 'LOADING_START' })
}

export function setLoadingDone() {
    return (dispatch) => dispatch( { type: 'LOADING_DONE' })
}
