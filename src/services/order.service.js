
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveOrder, getActionAddOrder, getActionUpdateOrder } from '../store/order.actions.js'
import { store } from '../store/store'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'order'
const orderChannel = new BroadcastChannel('orderChannel')
const gOrders = []


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
    getEmptyOrder
}
window.cs = orderService


function query(filterBy) {
    // loggedinUser === buyer._id || seller._id or loggedinUser.isAdmin
    // filter by : status 
    return storageService.query(STORAGE_KEY)
        .then(orders => {
            if (!orders || !orders.length) {
                storageService.postMany(STORAGE_KEY, gOrders)
                orders = gOrders
            }
            return orders
        })
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
    // return axios.get(`/api/order/${orderId}`)
}

async function remove(orderId) {
    await storageService.remove(STORAGE_KEY, orderId)
    orderChannel.postMessage(getActionRemoveOrder(orderId))
}

async function save(order, gig = null) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
        orderChannel.postMessage(getActionUpdateOrder(savedOrder))

    } else {
        if (!gig)
            throw new Error('in order to make new order - you have to have gig')

        const user = userService.getLoggedinUser()
        if (!user)
            throw new Error('Not loggedin user - cannot make an order')

        order = _makeOrder(gig, user)
        savedOrder = await storageService.post(STORAGE_KEY, order)
        orderChannel.postMessage(getActionUpdateOrder(savedOrder))
    }
    return savedOrder
}


function _makeOrder(gig, user) {
    const order = {
        buyer: {
            _id: user._id,
            fullname: user.fullname,
            imgUrl: user.imgUrl,
            username: user.username,
        },
        seller: gig.owner,
        gig: {
            _id: gig._id,
            title: gig.title,
            daysToMake: gig.daysToMake,
            price: gig.price,
            img: gig.imgUrls[0],
        },
        orderStatus: 'pending',
        //later by the DB
        _id: utilService.makeId(),
        createdAt: new Date(),
    }
    return order
}

function getEmptyOrder() {
    return {
        _id: '',
        createdAt: '',
        buyer: { _id: '', fullname: '', imgUrl: '', level: '', rate: 0 },
        seller: { _id: '', fullname: '', imgUrl: '', level: '', rate: 0 },
        gig: {
            _id: '',
            name: '',
            price: 0
        },
        status: ''
    }
}

//         title: 'I will put a card in the grid for you so you can test your application' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(10, 1000),
//         daysToMake: 0,
//         description: 'i will add some description for you so you can see a description in your order',
//         imgUrls:[{imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/8a1623fd3276ad7297d7647a8727bdf0-1589096119095/6c637953-9dc0-4c9c-b04d-c13c947fdc43.jpg"}],
//         owner: {_id: 'u101', fullname: 'james carlo', imgUrl: 'url', level: 'basic', rate: 4 },
//         tags: ['logo-design', 'artisitic', 'proffesional', 'accessible'],
//         likedByUsers: []
//     }
// }

// "order": [
//     {
//       "_id": "o1225",
//       "createdAt": 9898989,
//       "buyer": "mini-user",
//       "seller": "mini-user",
//       "gig": {
//         "_id": "i101",
//         "name": "Design Logo",
//         "price": 20
//       },
//       "status": "pending"
//     }
//   ],

// "gig": [
//     {
//       "_id": "i101",
//       "title": "I will design your logo",
//       "price": 12,
//       "owner": {
//         "_id": "u101",
//         "fullname": "Dudu Da",
//         "imgUrl": "url",
//         "level": "basic/premium",
//         "rate": 4
//  not    "password: 123"
//       },
//       "daysToMake": 3,
//       "description": "Make unique logo...",
//       "imgUrl": "",
//       "tags": [
//         "logo-design",
//         "artisitic",
//         "proffesional",
//         "accessible"
//       ],
//       "likedByUsers" : ['mini-user'] // for user-wishlist : use $in
//        vendor: 'Susita-' + (Date.now() % 1000),

//     }
//   ]
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))



