
import { storageService } from './async-storage.service.js'
import { httpService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveGig, getActionAddGig, getActionUpdateGig } from '../store/gig.actions.js'
import { store } from '../store/store'
import { showErrorMsg } from './event-bus.service.js'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'gig'
const gigChannel = new BroadcastChannel('gigChannel')

const gCategories = [
    {
        name: "video explainer",
        features: [
            "Background Music",
            "Add Logo",
            "60 Seconds Running Time"]
    },
    {
        name: "illustration",
        features: [
            "Source File",
            "High Resolution",
            "Background/Scene",
            "Color",
            "Full Body",
            "Commercial Use",
            "1 Figure"
        ]
    },
    {
        name: "programming",
        features: [
            "Include Source Code",
            "Database Integration",
            "Setup File",
            "Detailed Code Comments",
            "3D Mockup",
            "Source File"]
    },
    {
        name: "logo design",
        features: [
            "1 Concept Included",
            "Logo Transparency",
            "Vector File",
            "Printable File",
            "3D Mockup",
            "Source File"
        ]
    },
    {
        name: "wordpress",
        features: [
            "1 Page",
            "Design Customization",
            "Content Upload",
            "Responsive Design"
        ]
    },
    {
        name: "voice over",
        features: [
            "HQ Audio File (WAV format)",
            "Number Of Words: 150"
        ]
    },
    {
        name: "marketing",
        features: [
            "Multiple Campaigns",
            "Researched audiences",
            "Multiple Ads",
            "Budget & Creative Optimization",
            "Free tips"
        ]
    },
]

const gGigs = [
    {
        _id: 'g101',
        title: 'I will do hyper realistic pencil portrait by hand drawing',
        category: "illustration",
        price: 12,
        daysToMake: 3,
        description: "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
        imgUrls: [{ imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg" },
        { imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg" },
        { imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg" }],
        owner: {
            _id: 'u101', username: 'james', fullname: 'james carlo', imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/798a61194492b92313c2f5b27d5397bb-1615924783131/a6a1c7f0-0cc0-4c50-95e1-2693d183ee1c.jpg",
            level: 'basic', rate: 4
        },
        tags: ['logo-design', 'artisitic', 'professional', 'accessible'],
        likedByUsers: [{}]
    },
    {
        _id: 'g102',
        title: "I will do hyper realistic pencil sketch portrait by hand drawing",
        category: "illustration",
        price: 151,
        daysToMake: 2,
        description: "Hello, this is Masuk, stand up for vividstore,I am a young and enthusiastic graphic artist and realistic pencil sketch artist. I am certified as graphic designer from George Washington University, USA. I have almost 11 years experience in this field since my university life. I really love to work with Adobe Illustrator, Adobe Photoshop, and so on as a full time online freelancer. And also passionate about sketching. Thank you.",
        imgUrls: [{ imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/83cc7c97f9873bdb052590a94d32f84c-1576419363871/ed47443e-0f9b-42ab-beaf-ec0a0acccfe8.jpeg" },
        { imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197422311/original/1907136f4b9684daa164acfa5cfedc6035b771b1.jpg" }],
        owner: {
            _id: 'u102', username: 'marco', fullname: 'marco polo', imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
            level: 'premium', rate: 5
        },
        tags: ['garage', 'mechanics', 'professional', 'accessible'],
        likedByUsers: [{}]
    },
    {
        _id: 'g103',
        title: "I will create an effective instagram hashtag growth strategy",
        category: "marketing",
        price: 5000,
        daysToMake: 1,
        description: "Hello! My name is Tommy. I am a multi-displinary marketer with experience in both the Western and Chinese digital marketing landscape. I am passionate about crafting impactful experiences and digital marketing strategies at the intersection of brand and product. I have worked in London, Hong Kong and in Shanghai for companies such as the Adidas, L'Oreal, Pfizer and Danone I currently offer Instagram growth and TikTok marketing strategies on Fiverr",
        imgUrls: [{ imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg" },
        { imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/155512325/original/9d62fbdec2b0bffd0318f9af43c2de023b62f5f0.jpg" }],
        owner: {
            _id: 'u103', username: 'amos', fullname: 'amos devinci', imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/e34531bf0bbed9d144dba7384f6473b6-1621577835789/60307055-cde9-4dc2-9e9e-4daa421991d3.jpg",
            level: 'basic', rate: 5
        },
        tags: ['programming', 'coding-academy', 'professional', 'accessible'],
        likedByUsers: [{}]
    },
    {
        _id: 'g104',
        title: "I will develop a content strategy for your brand or business",
        category: "marketing",
        price: 100,
        daysToMake: 2,
        description: "Hello! My name is Maria, and I am a digital marketer with over 3 years of experience working with diverse brands and businesses. I am well versed in everything marketing, SEO, graphic design, writing, and video editing. I am a one-stop shop for whatever you and your brand needs. I look to working with you!",
        imgUrls: [{ imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/207813409/original/9557f50a12d8fccb5c52fb65b35f91cc036f99c6.jpg" }],
        owner: {
            _id: 'u104', username: 'amos', fullname: 'moni piloni', imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/1fe02234f0b300905f098d1c2eef2599-1621414093019/30dd09bd-748a-49c0-b3bc-ee3071bdfadb.jpg",
            level: 'professional', rate: 5
        },
        tags: ['music', 'mastering', 'professional', 'accessible'],
        likedByUsers: [{}]
    },
    {
        _id: 'g105',
        title: "I will do data entry, copy paste, web research as your VA",
        category: "programming",
        price: 150,
        daysToMake: 2,
        description: 'i will fix it',
        imgUrls: [{ imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/1fe02234f0b300905f098d1c2eef2599-1621414093019/30dd09bd-748a-49c0-b3bc-ee3071bdfadb.jpg" },
        { imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/207580502/original/6d05bb9cde191b9423733c6b49d0e11892e35ee0.jpg" }],
        owner: {
            _id: 'u105', username: 'amos', fullname: 'avi phone', imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/7928a9bdb9e68c7dcc870f7dac91d92b-768025031598387384699/JPEG_20200826_012943_1616096493516260103.jpg",
            level: 'basic', rate: 4
        },
        tags: ['cellolar', 'professional', 'accessible'],
        likedByUsers: [{}]
    },
    {
        _id: 'g106',
        title: "I will design 3 modern minimalist flat logo designs",
        category: "logo Design",
        price: 100,
        daysToMake: 2,
        description: 'i will fix it',
        imgUrls: [{ imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/044fb5914a845a4eb59fc2b69f7f7b32-1634120039750/4dbc2acb-7322-4cd0-9afb-e5190e8e8a0d.jpg" },
        { imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3171448/original/a41a38f3733bb97279a49d1449f7337dece50693.jpg" }],
        owner: {
            _id: 'u105', username: 'avi', fullname: 'avi phone', imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/7928a9bdb9e68c7dcc870f7dac91d92b-768025031598387384699/JPEG_20200826_012943_1616096493516260103.jpg",
            level: 'basic', rate: 4
        },
        tags: ['cellolar', 'professional', 'accessible'],
        likedByUsers: [{}]
    },
    {
        _id: 'g107',
        title: "I will create modern unique and creative logo design",
        category: "logo Design",
        price: 150,
        daysToMake: 2,
        description: "I am a professional graphics designer from PakIsTaN... Designing is not only my job, it's my Passion. All I need from you is a rough sketch of your idea. Then you can just relax and see the magic happening. Not only you'll get stunning and professional designs, but also you'll have top class custome",
        imgUrls: [{ imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d098c50d82476b11568f3a50111a8a89-1636128369729/ef737ebd-6908-47bc-be50-963dabe16d0e.jpg" },
        { imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/a2dd1a0482bbfe54e61c6c2d6e64696e-1640431251801/943f73b5-dc43-4fe4-9728-9a58f0aafdbc.jpg" }],
        owner: {
            _id: 'u100', username: 'avi', fullname: 'avi phone', imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/7928a9bdb9e68c7dcc870f7dac91d92b-768025031598387384699/JPEG_20200826_012943_1616096493516260103.jpg",
            level: 'basic', rate: 4
        },
        tags: ['cellolar', 'professional', 'accessible'],
        likedByUsers: [{}]
    },
    {
        _id: 'g108',
        title: "I will do professional modern business logo design with copyrights",
        category: "logo Design",
        price: 20,
        daysToMake: 2,
        description: 'i will fix it',
        imgUrls: [{ imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/eb6eef20969192eca1d8b1301e91cb4f-1630440851285/60f03cc4-71f2-437b-a241-f9423b6e2728.jpg" },
        { imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/3ec0d56f436079ef157dbcc1d21c4c62-1625030446037/1c926a30-7aa5-4de8-9a3b-6565be7ddd5b.jpg" }],
        owner: {
            _id: 'u100', username: 'avi', fullname: 'avi phone', imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/7928a9bdb9e68c7dcc870f7dac91d92b-768025031598387384699/JPEG_20200826_012943_1616096493516260103.jpg",
            level: 'basic', rate: 4
        },
        tags: ['cellolar', 'professional', 'accessible'],
        likedByUsers: [{}]
    },
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
    isLikedByUser,
    toggleLike,
    getCategories,
    getPopularCategories,
    getFeaturesByCategory,
    getCategoriesNames
}
window.cs = gigService


async function query(filterBy) {
    const { txt, userId } = filterBy
    try {
        let gigs = await storageService.query(STORAGE_KEY)
        if (!gigs || !gigs.length) {
            storageService.postMany(STORAGE_KEY, gGigs)
            gigs = gGigs
        }
        if (txt) {
            const regex = new RegExp(txt, 'i')
            gigs = gigs.filter(gig => regex.test(gig.title))
        }
        if (userId) {
            gigs = gigs.filter(gig => gig.owner._id === userId)
        }
        return gigs
    } catch (err) {
        showErrorMsg('Cannot load gigs')
        console.log('Cannot load gigs', err)
    }

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
        return savedGig
    } else {
        // Later, owner is set by the backend
        let newGig = _getEmptyGig()
        gig = { ...newGig, ...gig }
        try {
            const owner = await userService.getLoggedinUser()
            if (owner._id){
                gig.owner = await userService.getMiniuserById(owner._id)
                savedGig = storageService.post(STORAGE_KEY, gig)
                gigChannel.postMessage(getActionAddGig(savedGig))
                return savedGig
            }
        } catch (err) {
            showErrorMsg('you need to login')
            console.log('no logged in user Cannot add/save gig', err)
        }
        // console.log('upd gig', gig)
        // if (!gig.owner)
        //     gig.owner = { _id: 'u101', fullname: 'james carlo', imgUrl: 'url', level: 'basic', rate: 4 }
    }
}

function _getEmptyGig() {
    return {
        title: 'empty gig title' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(10, 1000),
        category: "logo Design",
        price: 37,
        daysToMake: 3,
        description: 'empty gig description',
        imgUrls: [{ imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/044fb5914a845a4eb59fc2b69f7f7b32-1634120039750/4dbc2acb-7322-4cd0-9afb-e5190e8e8a0d.jpg" },
        { imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3171448/original/a41a38f3733bb97279a49d1449f7337dece50693.jpg" }],
        // owner: { _id: '', username: '', fullname: '', imgUrl: '', level: '', rate: 0 },
        tags: ['logo-design', 'artisitic', 'professional', 'accessible'],
        likedByUsers: []
    }
}

async function toggleLike(gigId, user) {
    const gig = await getById(gigId)
    if (user) {
      const idx = gig.likedByUsers.findIndex(currUser => currUser._id === user._id)
      if (idx === -1) {
        const miniUser = {
          fullname: user.fullname,
          imgUrl: user.imgUrl,
          _id: user._id,
        }
        gig.likedByUsers = [...gig.likedByUsers, miniUser]
      } else {
        gig.likedByUsers.splice(idx, 1)
      }
    } else {
      storageService.saveGuestGigs(gig)
    }
    const data = await save(gig)
    return data
  }

async function isLikedByUser(gig) {
    const user = await userService.getLoggedinUser()
    return gig.likedByUsers.some(currUser => currUser._id === user._id)
  }

// when working with database need to turn to a real async functions
async function getCategories() {
    // const categories = await httpService.get("category")
    // const categories = await storageService.get('category')
    return gCategories
}

async function getPopularCategories(categoriesCount) {
    // const categories = await httpService.get("category")
    // const categories = await storageService.get("category")
    var popularCategories = gCategories.slice(0, categoriesCount)
    console.log('popularCategories:', popularCategories)
    return popularCategories.map((category) => {
      return `${category.title
        .charAt(0)
        .toUpperCase()}${category.title.slice(1)}`
      })
    }

async function getCategoriesNames() {
    // const categories = await httpService.get("category")
    // const categories = await storageService.get('category')
    return gCategories.map((category) => category.title)
}

async function getFeaturesByCategory(categoryName) {
    const category = gCategories.find((category) => category.title === categoryName)
    if (category)
        return category.features
    else
        return null    
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
//         "professional",
//         "accessible"
//       ],
//       "likedByUsers" : ['mini-user'] // for user-wishlist : use $in
//        vendor: 'Susita-' + (Date.now() % 1000),

//     }
//   ]
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




