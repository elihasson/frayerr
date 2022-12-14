import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { Explore } from './pages/explore.jsx'
import { ReviewApp } from './pages/review-app.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { GigDetails } from './pages/gig-details.jsx'
import { UserBackOffice } from './pages/user-back-office.jsx'
import { UserOrder } from './pages/user-order.jsx'
import { UserPurchase } from './pages/user-purchase.jsx'
import { UserGigs } from './pages/user-gigs.jsx'
import { OrderCheckout } from './cmps/order-checkout.jsx'
import { GigEdit } from './pages/gig-edit.jsx'

// Routes accessible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home',
    },
    {
        path: 'explore',
        component: <Explore />,
        label: 'Explore'
    },
    {
        path: "/explore/:gigId",
        component: <GigDetails />,
        label: 'Gig Details'
    },
    {
        path: "/user/:userId",
        component: <UserBackOffice />,
        label: 'User back office'
    },
    {
        path: "/user/:userId/order",
        component: <UserOrder />,
        label: 'User order manager'
    },
    {
        path: "/user/:userId/purchase",
        component: <UserPurchase />,
        label: 'User purchase manager'
    },
    {
        path: "/user/:userId/gig",
        component: <UserGigs />,
        label: 'User gigs'
    },
    {
        path: "/checkout/:gigId",
        component: <OrderCheckout />,
        label: 'Order Checkout'
    },
    {
        path: "/edit/:gigId",
        component: <GigEdit />,
        label: 'Edit gig'
    },
    {
        path: "/edit/",
        component: <GigEdit />,
        label: 'Create gig'
    },

    //     path: 'review',
    //     component: <ReviewApp />,
    //     label: 'Reviews'
    // },
    // {
    //     path: 'chat',
    //     component: <ChatApp />,
    //     label: 'Chat'
    // },
    {
        path: 'about',
        component: <AboutUs />,
        label: 'About us'
    }
    // {
    //     path: 'admin',
    //     component: <AdminApp />,
    //     label: 'Admin Only'
    // }
]

export default routes