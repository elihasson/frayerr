
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveGig, getActionAddGig, getActionUpdateGig } from '../store/gig.actions.js'
import {store} from '../store/store'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'gig'
const gigChannel = new BroadcastChannel('gigChannel')


;(()=>{
    gigChannel.addEventListener('message', (ev)=>{
        store.dispatch(ev.data)
    })
})()

export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
}
window.cs = gigService


function query(filterBy) {
    return storageService.query(STORAGE_KEY)
}
function getById(gigId) {
    return storageService.get(STORAGE_KEY, gigId)
    // return axios.get(`/api/gig/${gigId}`)
}
async function remove(gigId) {
    await storageService.remove(STORAGE_KEY, gigId)
    gigChannel.postMessage(getActionRemoveGig(gigId))
}
async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await storageService.put(STORAGE_KEY, gig)
        gigChannel.postMessage(getActionUpdateGig(savedGig))
        
    } else {
        // Later, owner is set by the backend
        gig.owner = userService.getLoggedinUser()
        savedGig = await storageService.post(STORAGE_KEY, gig)
        gigChannel.postMessage(getActionAddGig(savedGig))
    }
    return savedGig
}

function getEmptyGig() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

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
//     }
//   ]
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




