// import React from 'react'
import { useEffect, useState } from "react"

import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useParams } from 'react-router-dom'

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import { NavBar } from './nav-bar.jsx'
import { GigFilter } from './gig-filter'
import { LoginSignup } from './login-signup.jsx'

import userImg from '../assets/img/profile_img_test.jpeg'
import { toggleJoinModal, toggleLoginModal } from '../store/system.actions'

import { Login } from './login'
import { Signup } from './signup'
export const AppHeader = (props) => {

    const { users, user, count } = useSelector(state => state.userModule)
    const isLoading = useSelector(state => state.systemModule.isLoading)
    const isHome = useSelector(state => state.systemModule.isHome)
    const isJoinModal = useSelector(state => state.systemModule.isJoinModal)
    const isModalSign = useSelector(state => state.systemModule.isModalSign)

    const dispatch = useDispatch()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScroll, setIsScroll] = useState(false)
    const [navBarOpenClassName, setNavBarOpenClassName] = useState('')

    const params = useParams()


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    const handleScroll = (ev) => {
        document?.documentElement?.scrollTop > 30 ? setIsScroll(true) : setIsScroll(false)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        toggleMenuClass()
    }

    const toggleMenuClass = () => {
        if (isMenuOpen) setNavBarOpenClassName('')
        else setNavBarOpenClassName('open')
    }

    const isHomeHeaderTop = () => {
        console.log('isScroll:', isScroll)
        console.log('isHome:', isHome)
        if (isHome && isScroll) return 'home-top-header-with-scroll'
        if (isHome) return 'home-top-header-no-scroll'

    }
    console.log('isHomeHeaderTop():', isHomeHeaderTop());

    return (
        <div className={`app-header-container full main-layout ${isHomeHeaderTop()}`}>
            {isMenuOpen && <div onClick={toggleMenu} className="main-screen"></div>}
            <NavBar classProp={navBarOpenClassName} />
            <header className="app-header" >

                <div className='burger-icon-gig-filter-container'>
                    <div className='burger-icon-container'>
                        <div className="burger-button-container" onClick={toggleMenu}>
                            {isHome && !isScroll && <div><svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19"><rect y="16" width="23" height="3" rx="1.5" fill="#fff"></rect><rect width="23" height="3" rx="1.5" fill="#fff"></rect><rect y="8" width="23" height="3" rx="1.5" fill="#fff"></rect></svg></div>}
                            {isHome && isScroll && <div><svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19"><rect y="16" width="23" height="3" rx="1.5" fill="#555"></rect><rect width="23" height="3" rx="1.5" fill="#555"></rect><rect y="8" width="23" height="3" rx="1.5" fill="#555"></rect></svg></div>}
                            {!isHome && !isScroll && <div><svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19"><rect y="16" width="23" height="3" rx="1.5" fill="#555"></rect><rect width="23" height="3" rx="1.5" fill="#555"></rect><rect y="8" width="23" height="3" rx="1.5" fill="#555"></rect></svg></div>}
                        </div>

                        <NavLink to="/" className={`frayerr-logo `}>
                            <div>frayerr<span>.</span></div>
                        </NavLink>
                    </div>

                    <div className='gig-filter-container'>
                        <GigFilter />
                    </div>
                </div>

                {!isHome && <div className='icon-search-bar-container'>

                    <NavLink to="/" >
                        <NotificationsNoneOutlinedIcon />
                    </NavLink>

                    <NavLink to="/" >
                        <MailOutlineOutlinedIcon />
                    </NavLink>

                    <NavLink to="/" className='favorite-icon-button'>
                        <FavoriteBorderOutlinedIcon />
                    </NavLink>

                    <NavLink to="/" className='orders-button'>
                        <div>Orders</div>
                    </NavLink>

                </div>}

                {isHome && <div className='icon-search-bar-container'>

                    <NavLink to="/explore" className='explore-button'>
                        <div>Explore</div>
                    </NavLink>

                    {/* <NavLink to="/" className='signin-button'>
                        <div onClick={() => {console.log(isModalSign); toggleLoginModal(true)}}>Sign in</div>
                    </NavLink>

                    <NavLink to="/" className='join-button'>
                        <div onClick={() => {console.log(isJoinModal); toggleJoinModal(true)}}>Join</div>
                    </NavLink> */}

                    <NavLink to="/" className='signin-button'>
                        <div onClick={() => {toggleLoginModal(true)}}>Sign in</div>
                    </NavLink>

                    <NavLink to="/" className='join-button'>
                        <div onClick={() => {toggleJoinModal(true)}}>Join</div>
                    </NavLink>

                </div>}

                {!isHome && <div className='avatar-logo-container'>
                    <NavLink to="/explore"> <img src={userImg} alt="user img" className='user-profile-img' /> </NavLink>
                </div>}

                {/* <nav>
                {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}

                {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <span className="score">{user.score?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }

                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                }

            </nav> */}
            </header>
        </div>
    )
}