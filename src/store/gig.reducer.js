const initialState = {
    gigs: [],
    cart:[],
    lastRemovedGig: null
}
export function gigReducer(state = initialState, action) {
    var newState = state
    var gigs
    var cart
    switch (action.type) {
        case 'SET_GIGS':
            newState = { ...state, gigs: action.gigs }
            break
        case 'REMOVE_GIG':
            const lastRemovedGig = state.gigs.find(gig => gig._id === action.gigId)
            gigs = state.gigs.filter(gig => gig._id !== action.gigId)
            newState = { ...state, gigs, lastRemovedGig}
            break
        case 'ADD_GIG':
            newState = { ...state, gigs:[...state.gigs, action.gig]}
            break
        case 'UPDATE_GIG':
            gigs = state.gigs.map(gig => (gig._id === action.gig._id)? action.gig : gig)
            newState = { ...state, gigs}
            break
        case 'ADD_TO_CART':
            newState = { ...state, cart:[...state.cart, action.gig]}
            break
        case 'REMOVE_FROM_CART':
            cart = state.cart.filter(gig => gig._id !== action.gigId)
            newState = { ...state, cart}
            break
        case 'CLEAR_CART':
            newState = { ...state, cart: []}
            break
        case 'UNDO_REMOVE_GIG':
            if (state.lastRemovedGig) {
                newState = { ...state, gigs: [...state.gigs, state.lastRemovedGig], lastRemovedGig: null}
            }
            break
        default:
    }
    // For debug:
    window.gigState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState

}
