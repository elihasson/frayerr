
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveGig, getActionAddGig, getActionUpdateGig } from '../store/gig.actions.js'
import { store } from '../store/store'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'gig'
const gigChannel = new BroadcastChannel('gigChannel')
const gGigs = [
    {
        _id: 'g101', title: 'I will design your logo', price: 12, daysToMake: 3,
        description: 'make unique logo', imgUrl: 'url',
        owner: { _id: 'u101' , fullname: 'james carlo', 
        imgUrls: [{imgUrl: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/256384462/original/5235c1c65402ead582997c6392e3f6ea54a16a10.jpg'},
        {imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/de7b8ad34afe97d7590a32b76335775f-1650626158997/320257df-a518-48db-b4f8-ed64daafadfd.jpg'}, 
        {imgUrl: 'https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_faces/couple.jpg'}], 
        level: 'basic', rate: 4 },
        tags: ['logo-design', 'artisitic', 'proffesional', 'accessible'],
        likedByUsers: [{}]
    },
    {
        _id: 'g102', title: 'I will fix your car', price: 120, daysToMake: 2,
        description: 'best of the best', 
        imgUrls: [{imgUrl: 'https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_faces/couple.jpg'},
        {imgUrl: 'https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_faces/couple.jpg'}],
        owner: { _id: 'u102', fullname: 'marco polo', imgUrl: 'url', level: 'premium', rate: 5 },
        tags: ['garage', 'mechanics', 'proffesional', 'accessible'],
        likedByUsers: [{}]
    },
    {
        _id: 'g103', title: 'building sites', price: 5000, daysToMake: 1,
        description: 'make a great react app', 
        imgUrls: [{imgUrl: 'https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_faces/couple.jpg'}],
        owner: { _id: 'u103', fullname: 'amos devinci', imgUrl: 'url', level: 'basic', rate: 5 },
        tags: ['programming', 'coding-academy', 'proffesional', 'accessible'],
        likedByUsers: [{}]
    },
    {
        _id: 'g104', title: 'master of mastering', price: 100, daysToMake: 2,
        description: 'great song mastering', 
        imgUrls: [{imgUrl: 'https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_faces/couple.jpg'}],
        owner: { _id: 'u104', fullname: 'moni piloni', imgUrl: 'url', level: 'professional', rate: 5 },
        tags: ['music', 'mastering', 'proffesional', 'accessible'],
        likedByUsers: [{}]
    },
    {
        _id: 'g105', title: 'I will fix your phone', price: 150, daysToMake: 2,
        description: 'i will fix it', 
        imgUrls: [{imgUrl: 'https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_faces/couple.jpg'}],
        owner: { _id: 'u105', fullname: 'avi phone', imgUrl: 'url', level: 'basic', rate: 4 },
        tags: ['cellolar', 'proffesional', 'accessible'],
        likedByUsers: [{}]
    }
]


    ; (() => {
        gigChannel.addEventListener('message', (ev) => {
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
        .then(gigs => {
            if (!gigs || !gigs.length) {
                storageService.postMany(STORAGE_KEY, gGigs)
                gigs = gGigs   
            }
            return gigs
        })
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
        title: 'I will put a title' + (Date.now() % 1000),
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




