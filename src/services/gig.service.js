
import { httpService } from './http.service'
import { storageService } from './async-storage.service'

import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveGig, getActionAddGig, getActionUpdateGig } from '../store/gig.actions.js'
import { store } from '../store/store'
import { showErrorMsg } from './event-bus.service.js'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'gig'
const gigChannel = new BroadcastChannel('gigChannel')

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
    isLikedByUser,
    toggleLike,
    getCategories,
    // getPopularCategories,
    // getFeaturesByCategory,
    // getCategoriesNames
}
window.cs = gigService


async function query(filterBy) {
    try {
        const gigs = await httpService.get('gig/', filterBy)
        return gigs
    } catch (err) {
        showErrorMsg('Cannot load gigs')
        console.log('Cannot load gigs', err)
    }

}

async function getById(gigId) {
    try {
        const gig = await httpService.get(`gig/${gigId}`)
        return gig
    } catch (err) {
        showErrorMsg('Cannot load gig')
        console.log('Cannot load gig', err)
    }
}

async function remove(gigId) {
    try {
        const gig = await httpService.delete(`gig/${gigId}`)
        gigChannel.postMessage(getActionRemoveGig(gigId))
        return gig
    } catch (err) {
        showErrorMsg('Cannot load gig')
        console.log('Cannot load gig', err)
    }
}

async function save(gig) {
    let savedGig
    if (gig._id) {
        try {
            savedGig = await httpService.put(`gig/${gig._id}`, gig)
            gigChannel.postMessage(getActionUpdateGig(savedGig))
            return savedGig
        } catch (err) {
            showErrorMsg('Cannot update gig')
            console.log('Cannot update gig', err)
        }
    } else {
        try {
            const owner = await userService.getLoggedinUser()
            if (owner._id) {
                savedGig = await httpService.post('gig/', gig)
                gigChannel.postMessage(getActionAddGig(savedGig))
                return savedGig
            } else {
                showErrorMsg('you need to login')
                console.log('no logged in user Cannot add/save gig')
            }
        } catch (err) {
            showErrorMsg('you need to login')
            console.log('no logged in user Cannot add/save gig', err)
        }
    }
}

async function toggleLike(gigId, user) {
    const gig = await getById(gigId);
    if (user) {
        const idx = gig.likedByUsers.findIndex(currUser => currUser._id === user._id)
        if (idx === -1) {
            const miniUser = {
                fullname: user.fullname,
                imgUrl: user.imgUrl,
                _id: user._id,
            };
            gig.likedByUsers = [...gig.likedByUsers, miniUser];
        } else {
            gig.likedByUsers.splice(idx, 1)
        }
    } else {
        storageService.saveGuestGigs(gig);
    }
    const data = await save(gig);
    return data;
}

async function isLikedByUser(gig) {
    const user = await userService.getLoggedinUser()
    return gig.likedByUsers?.some(currUser => currUser._id === user._id)
}

async function getCategories(filterBy) {
    try {
        const categories = await httpService.get('gig/category/', filterBy)
        return categories
    } catch (err) {
        showErrorMsg('Cannot load categories')
        console.log('Cannot load categories', err)
    }

}

// AHARON - ive entered all categories function into comments for debug!!!!!

// async function getPopularCategories(categoriesCount) {
//     // const categories = await httpService.get("category");
//     // const categories = await storageService.get("category")
//     var popularCategories = gCategories.slice(0, categoriesCount)
//     console.log('popularCategories:', popularCategories)
//     return popularCategories.map((category) => {
//         return `${category.title
//             .charAt(0)
//             .toUpperCase()}${category.title.slice(1)}`;
//     })
// }

// async function getCategoriesNames() {
//     // const categories = await httpService.get("category");
//     // const categories = await storageService.get('category')
//     return gCategories.map((category) => category.title)
// }

// async function getFeaturesByCategory(categoryName) {
//     const category = gCategories.find((category) => category.title === categoryName)
//     if (category)
//         return category.features
//     else
//         return null
// }





