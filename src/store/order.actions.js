import { orderService } from '../services/order.service.js'
import { userService } from '../services/user.service.js'
import { showSuccessMsg, showErrorMsg, showThanksMsg } from '../services/event-bus.service.js'

// Action Creators:
export function getActionRemoveOrder(orderId) {
    return {
        type: 'REMOVE_ORDER',
        orderId
    }
}
export function getActionAddOrder(order) {
    return {
        type: 'ADD_ORDER',
        order
    }
}
export function getActionUpdateOrder(order) {
    return {
        type: 'UPDATE_ORDER',
        order
    }
}

export function getActionSetWatchedOrder(order) {
    return {
        type: 'SET_WATCHED_ORDER',
        order
    }
}



export function loadOrders() {
    return async (dispatch, getState) => {
        const  filterBy  = getState().orderModule.filterBy
        try {
            const orders = await orderService.query(filterBy)
            console.log('orders from DB:', orders)
            dispatch({
                type: 'SET_ORDERS',
                orders
            })

        } catch (err) {
            showErrorMsg('Cannot load orders')
            console.log('Cannot load orders', err)
        }
    }
}

export function removeOrder(orderId) {
    return async (dispatch) => {
        try {
            await orderService.remove(orderId)
            console.log('Deleted Successfully!')
            dispatch(getActionRemoveOrder(orderId))
            showSuccessMsg('Order removed')
        } catch (err) {
            showErrorMsg('Cannot remove order')
            console.log('Cannot remove order', err)
        }
    }
}

export function addOrder(order, gig = null) {
    return (dispatch) => {
        orderService.save(order, gig)
            .then(savedOrder => {
                console.log('Added Order', savedOrder)
                dispatch(getActionSetWatchedOrder(savedOrder))
                return savedOrder
            })
            .then(savedOrder => {
                dispatch(getActionAddOrder(savedOrder))
                showThanksMsg('Thank you for Purchasing')
            }) 
            .catch(err => {
                showErrorMsg('Cannot add order')
                console.log('Cannot add order', err)
            })
    }
}

export function updateOrder(order) {
    return (dispatch) => {
        orderService.save(order)
            .then(savedOrder => {
                console.log('Updated Order:', savedOrder)
                dispatch(getActionUpdateOrder(savedOrder))
                showSuccessMsg('Order updated')
            })
            .catch(err => {
                showErrorMsg('Cannot update order')
                console.log('Cannot save order', err)
            })
    }
}

export function loadOrder(orderId) {
    return async (dispatch) => {
        try {
            const order = await orderService.getById(orderId)
            dispatch({ type: 'SET_WATCHED_ORDER', order })
        } catch (err) {
            showErrorMsg('Cannot load order')
            console.log('Cannot load order', err)
        }
    }
}

export function setOrderFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({type: 'SET_ORDER_FILTER_BY', filterBy})
    }
}
export function setOrderFilterUserId(userId) {
    return (dispatch) => {
        dispatch({type: 'SET_FILTER_USER_ID', userId})
    }
}


// export function addToCart(order) {
//     return (dispatch) => {
//         dispatch({
//             type: 'ADD_TO_CART',
//             order
//         })
//     }
// }

// export function removeFromCart(orderId) {
//     return (dispatch) => {
//         dispatch({
//             type: 'REMOVE_FROM_CART',
//             orderId
//         })
//     }
// }

// export function checkout() {
//     return async (dispatch, getState) => {
//         try {
//             const state = getState()
//             const total = state.orderModule.cart.reduce((acc, order) => acc + order.price, 0)
//             const score = await userService.changeScore(-total)
//             dispatch({ type: 'SET_SCORE', score })
//             dispatch({ type: 'CLEAR_CART' })
//             showSuccessMsg('Charged you: $' + total.toLocaleString())
//         } catch (err) {
//             showErrorMsg('Cannot checkout, login first')
//             console.log('OrderActions: err in checkout', err)
//         }
//     }
// }


// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveOrderOptimistic(orderId) {

    return (dispatch, getState) => {

        dispatch({
            type: 'REMOVE_ORDER',
            orderId
        })
        showSuccessMsg('Order removed')

        orderService.remove(orderId)
            .then(() => {
                console.log('Server Reported - Deleted Succesfully')
            })
            .catch(err => {
                showErrorMsg('Cannot remove order')
                console.log('Cannot load orders', err)
                dispatch({
                    type: 'UNDO_REMOVE_ORDER',
                })
            })
    }
}

