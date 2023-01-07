
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service'

import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveOrder, getActionAddOrder, getActionUpdateOrder } from '../store/order.actions.js'
import { store } from '../store/store'
import { showErrorMsg } from './event-bus.service.js'


// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'order'
const orderChannel = new BroadcastChannel('orderChannel')

    ; (() => {
        orderChannel.addEventListener('message', (ev) => {
            store.dispatch(ev.data)
        })
    })()

export const orderService = {
    query,
    getById,
    save,
    remove,
    // getEmptyOrder
}
window.cs = orderService

async function query(filterBy) {
    try {
        const orders = await httpService.get('order/', filterBy)
        return orders
    } catch (err) {
        showErrorMsg('Cannot load orders')
        console.log('Cannot load orders', err)
    }
}

async function getById(orderId) {
    try {
        const order = await httpService.get(`order/${orderId}`)
        return order
    } catch (err) {
        showErrorMsg('Cannot load order')
        console.log('Cannot load order', err)
    }
}

async function remove(orderId) {
    try {
        const gig = await httpService.delete(`order/${orderId}`)
        orderChannel.postMessage(getActionRemoveOrder(orderId))
        return gig
    } catch (err) {
        showErrorMsg('Cannot load gig')
        console.log('Cannot load gig', err)
    }
}

async function save(order = [], gig = null) {
    var savedOrder
    if (order._id) {
        try {
            savedOrder = await httpService.put(`order/${order._id}`, order)
            orderChannel.postMessage(getActionUpdateOrder(savedOrder))
            return savedOrder
        } catch (err) {
            showErrorMsg('Cannot update order')
            console.log('Cannot update order', err)
        }

    } else {
        if (!gig)
            throw new Error('in order to make new order - you have to have gig')

        const user = userService.getLoggedinUser()
        if (!user)
            throw new Error('Not loggedin user - cannot make an order')

        savedOrder = await httpService.post('order/', {order, gig})
        orderChannel.postMessage(getActionUpdateOrder(savedOrder))
    }
    return savedOrder
}

// AHARON - this order was commented for debug purpose

// function getEmptyOrder() {
//     return {
//         _id: '',
//         createdAt: '',
//         buyer: { _id: '', fullname: '', imgUrl: '', level: '', rate: 0 },
//         seller: { _id: '', fullname: '', imgUrl: '', level: '', rate: 0 },
//         gig: {
//             _id: '',
//             name: '',
//             price: 0
//         },
//         status: ''
//     }
// }



