const initialState = {
    orders: [],
    // cart: [],
    lastRemovedOrder: null,
    watchedOrder: null,
    filterBy: {
        userId: '',
    },
}
export function orderReducer(state = initialState, action) {
    var newState = state
    var orders
    // var cart
    switch (action.type) {
        case 'SET_ORDERS':
            newState = { ...state, orders: action.orders }
            break
        case 'SET_WATCHED_ORDER':
            newState = { ...state, watchedOrder: action.order }
            break;
        case 'REMOVE_ORDER':
            const lastRemovedOrder = state.orders.find(order => order._id === action.orderId)
            orders = state.orders.filter(order => order._id !== action.orderId)
            newState = { ...state, orders, lastRemovedOrder }
            break
        case 'ADD_ORDER':
            newState = { ...state, orders: [...state.orders, action.order] }
            break
        case 'UPDATE_ORDER':
            orders = state.orders.map(order => (order._id === action.order._id) ? action.order : order)
            newState = { ...state, orders }
            break
        case 'UNDO_REMOVE_ORDER':
            if (state.lastRemovedOrder) {
                newState = { ...state, orders: [...state.orders, state.lastRemovedOrder], lastRemovedOrder: null }
            }
            break
        case 'SET_FILTER_USER_ID':
            newState = { ...state, filterBy: { ...state.filterBy, userId: action.userId } }
            break

        default:
    }
    // For debug:
    window.orderState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState

}
