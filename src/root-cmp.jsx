import React from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Routes, Route } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import routes from './routes'
import { toggleJoinModal, toggleLoginModal } from './store/system.actions'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { Login } from './cmps/login'
import { Signup } from './cmps/signup'

// import { NavLink, useNavigate } from "react-router-dom"
export const RootCmp = () => {
    const isModalSign = useSelector(state => state.systemModule.isModalSign)
    const isJoinModal = useSelector(state => state.systemModule.isJoinModal)
    const dispatch = useDispatch()
        return (
            <div className='app-container'>
                {isModalSign && <div onClick={() => dispatch(toggleLoginModal())} className="main-screen"></div>}
                {isModalSign &&  <Login/>}
                {isJoinModal && <div onClick={() => dispatch(toggleJoinModal())} className="main-screen"></div>}
                {isJoinModal && <Signup/>}
                <main className='main-layout'>
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