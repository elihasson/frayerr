import React, { useEffect } from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Routes, Route } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import routes from './routes'
import { setIsNewOrder, toggleJoinModal, toggleLoginModal } from './store/system.actions'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { Login } from './cmps/login'
import { Signup } from './cmps/signup'
import { socketService, SOCKET_EVENT_UPDATE_USER } from './services/socket.service'
import { showIncomingOrderMsg } from './services/event-bus.service'

// import { NavLink, useNavigate } from 'react-router-dom'
export const RootCmp = () => {
    const isModalSign = useSelector(state => state.systemModule.isModalSign)
    const isJoinModal = useSelector(state => state.systemModule.isJoinModal)
    const dispatch = useDispatch()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_UPDATE_USER, (msg) => {
            console.log('msg', msg)
            if (msg === 'incoming-order') {
                console.log('msg:', msg)
                showIncomingOrderMsg('You have got a new order')
                dispatch(setIsNewOrder(true))
            }
 
        })
    }, [])

    return (
        <div className="app-container">
            {isModalSign && <div onClick={() => dispatch(toggleLoginModal())} className="main-screen"></div>}
            {isModalSign && <Login />}
            {isJoinModal && <div onClick={() => dispatch(toggleJoinModal())} className="main-screen"></div>}
            {isJoinModal && <Signup />}
            <main className="main-layout app-container-main">
                <AppHeader />
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
                <AppFooter />
            </main>
        </div>
    )

}