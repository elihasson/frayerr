import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { store } from '../store/store'
import { getActionSetWatchedUser } from '../store/review.actions'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { showSuccessMsg } from '../services/event-bus.service'
import { utilService } from './util.service'
import { showErrorMsg } from './event-bus.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    saveReview,
}

window.userService = userService


const gUsers = [
    {
        _id: 'u101',
        fullname: 'Golda Sheraton',
        imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/079e914e9f28e8269dee6bb109ef85a1-1570850131880/40fbde37-316f-4de2-9ca5-07b1300360d2.jpg",
        username: "golda",
        password: "gold",
        smallDesc: 'im a fan of arale kaminsky',
        level: "premium",
        rate: 4.5,
        isAdmin: false,
        reviews: [
            {
                id: "r101",
                txt: "i was in hospital when the job automatically completed. the fund was transferred and unfortunately she wrote the description wrongly. however she was willing to redo the work without any complains. very responsible freelancer. highly recommended",
                rate: 5,
                by: {
                    _id: 'u102',
                    fullname: "menashe walker",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/eb5d29b35cb0f6bd47e3a2f1fb8a55db-1595779512175/3d984139-fd41-42b2-a94c-fca974593c8a.jpg"
                }
            }]
    },
    {
        _id: 'u100',
        fullname: 'Frayerr Solutions',
        imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/200950826/original/08090f735021ad8441f30fe2f38542ce95a2ead9.png",
        username: "frayer",
        password: "123",
        smallDesc: 'the best of the best',
        rate: 4.5,
        level: "premium",
        
        isAdmin: true,
        reviews: [
            {
                id: "r102",
                txt: "we thank you for your incredible site, now we can work thanks to you, fiverr are sucks, i prefer the frayerr solutions by farr",
                rate: 5,
                by: {
                    _id: 'u102',
                    fullname: "menashe walker",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/eb5d29b35cb0f6bd47e3a2f1fb8a55db-1595779512175/3d984139-fd41-42b2-a94c-fca974593c8a.jpg"
                }

            },
        ],
    }

]


async function getUsers() {
    try {
        const users = await httpService.get('user/')
        return users
    } catch (err) {
        showErrorMsg('Cannot load users')
        console.log('Cannot load users', err)
    }
}

function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch(getActionSetWatchedUser(user))
}

async function getById(userId) {
    try {
        const user = await httpService.get(`user/${userId}`)

        socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
        socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
        socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

        return user
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

async function remove(userId) {
    try {
        const user = await httpService.delete(`user/${userId}`)
        return user
    } catch (err) {
        showErrorMsg('Cannot remove user')
        console.log('Cannot remove user', err)
    }
}

async function update(user) {
    if (getLoggedinUser()._id === user._id || getLoggedinUser().isAdmin) {
        try {
            const savedUser = await httpService.put(`user/${user._id}`, user)
            saveLocalUser(savedUser)
            return savedUser
        } catch (err) {
            showErrorMsg('Cannot update user')
            console.log('Cannot update user', err)
        }
    }
    return user
}

async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            socketService.login(user._id)
            return saveLocalUser(user)
        }
    } catch (err) {
        showErrorMsg('cannot login, try again')
        console.log('cannot login', err)
    }
}

async function signup(userCred) {
    try {
        const user = await httpService.post('auth/signup', userCred)
        if (user) {
            socketService.login(user._id)
            return saveLocalUser(user)
        }
    } catch (err) {
        showErrorMsg('cannot login, try again')
        console.log('cannot login', err)
    }

}

async function logout() {
    try {
        const res = await httpService.post('auth/logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        socketService.logout()
        return res
    } catch (err) {
        showErrorMsg('cannot logout, try again')
        console.log('cannot logout', err)
    }
}

async function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user

}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function saveReview(rate, txt, user, gigId = '', owner) {
    const review = {
        id: utilService.makeId(),
        txt,
        rate,
        createdAt: Date.now(),
        gigId: gigId,
        by: {
            _id: user._id,
            fullname: user.fullname,
            origin: user.origin || "Israel",
            imgUrl: user.imgUrl || null,
        },
    }
    owner.reviews = [...owner.reviews, review]
    const updatedOwner = await saveUser(owner)
    return updatedOwner
}

async function saveUser(user) {
    if (user._id) {
        return storageService.put('user', user)
        //   return httpService.put(`user/${user._id}`, user)
    } else {
        return storageService.post('user', user)
        // return httpService.post("user", user)
    }
}

