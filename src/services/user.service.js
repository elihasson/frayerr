import { storageService } from './async-storage.service'
// import { httpService } from './http.service'
import { store } from '../store/store'
import { getActionSetWatchedUser } from '../store/review.actions'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { showSuccessMsg } from '../services/event-bus.service'
import { utilService } from './util.service'

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
    getMiniuserById
}

window.userService = userService


const gUsers = [
    {
        _id: 'u101',
        fullname: 'Golda Sheraton',
        imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/079e914e9f28e8269dee6bb109ef85a1-1570850131880/40fbde37-316f-4de2-9ca5-07b1300360d2.jpg",
        username: "golda",
        password: "gold",
        level: "premium",
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


function getUsers() {
    return storageService.query('user')
        .then(users => {
            if (!users || !users.length) {
                storageService.postMany('user', gUsers)
                users = gUsers
            }
            return users
        })
    // return httpService.get(`user`)
}

function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch(getActionSetWatchedUser(user))
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)

    socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return user
}

async function getMiniuserById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`

    const miniuser = {
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        level: user.level,
        rate: user.rate
    }

    return miniuser 
}


function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    await storageService.put('user', user)
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user;
}

async function login(userCred) {
    const users = await storageService.query('user')
    // adding password check - added by Ariel
    const user = users.find(user => user.username === userCred.username && user.password === userCred.password)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    // userCred.score = 10000;
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    console.log('hi:')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    // return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }


function saveLocalUser(user) {
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
    return updatedOwner;
}

async function saveUser(user) {
    if (user._id) {
        return storageService.put('user', user)
        //   return httpService.put(`user/${user._id}`, user);
    } else {
        return storageService.post('user', user)
        // return httpService.post("user", user);
    }
}



// ;(async ()=>{
//     // await userService.login(gUsers[1])
//     // await userService.login(gUsers[0])
//     // await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()

// "user": [
//     {
//       "_id": "u101",
//       "fullname": "User 1",
//       "imgUrl": "/img/img1.jpg",
//       "username": "user1",
//       "password": "secret",
//       "level": "basic/premium",
//       "isAdmin: false"
//       "reviews": [
//         {
//           "id": "madeId",
//           "txt": "Very kind and works fast",
//           "rate": 4,
//           "by": {
//             "_id": "u102",
//             "fullname": "user2",
//             "imgUrl": "/img/img2.jpg"
//           }
//         }
//       ],
//     },
//   ]

