// import React from 'react'
import { useEffect, useState } from "react"

import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useParams  } from 'react-router-dom'

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import { NavBar } from './nav-bar.jsx'
import { GigFilter } from './gig-filter'
import { LoginSignup } from './login-signup.jsx'

import userImg from '../assets/img/profile_img_test.jpeg'

export const AppHeader = (props) => {

    const { users, user, count } = useSelector(state => state.userModule)
    const isLoading = useSelector(state => state.systemModule.isLoading)
    const dispatch = useDispatch()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isHome, setIsHome] = useState(true)
    const [isScroll, setIsScroll] = useState(false)
    const [navBarOpenClassName, setNavBarOpenClassName] = useState('')

    let location = useParams()
    
    useEffect(() => {
        checkIsHome()
        window.addEventListener('scroll', handleScroll)
    }, [])
    
    const checkIsHome = () => {
        location === {} ? setIsHome(true) : setIsHome(false)
    }

    const handleScroll = (ev) => {
        document?.documentElement?.scrollTop > 30 ? setIsScroll(true) : setIsScroll(false)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        toggleMenuClass()
    }
    
    const toggleMenuClass = () => {
        if(isMenuOpen) setNavBarOpenClassName('' )
        else setNavBarOpenClassName('open')
    }

    console.log('isHome:', isHome)
    console.log('location:', location)
    console.log('isScroll:', isScroll)


    return (
        <div className="app-header-container full main-layout">
            {isMenuOpen && <div onClick={toggleMenu} className="main-screen"></div>}
            <NavBar classProp={navBarOpenClassName}/>
            <header className="app-header " >

                <div className='burger-icon-gig-filter-container'>
                    <div className='burger-icon-container'>
                        <div className="burger-button-container" onClick={toggleMenu}>
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19"><rect y="16" width="23" height="3" rx="1.5" fill="#555"></rect><rect width="23" height="3" rx="1.5" fill="#555"></rect><rect y="8" width="23" height="3" rx="1.5" fill="#555"></rect></svg></div>
                        </div>

                        <NavLink to="/" className={`frayerr-logo `}>
                            <div>frayerr<span>.</span></div>
                        </NavLink>
                    </div>

                    <div className='gig-filter-container'>
                        <GigFilter />
                    </div>
                </div>

                <div className='icon-search-bar-container'>

                    <NavLink to="/" >
                        <NotificationsNoneOutlinedIcon />
                    </NavLink>

                    <NavLink to="/" >
                        <MailOutlineOutlinedIcon />
                    </NavLink>

                    <NavLink to="/" className={'favorite-icon-button'}>
                        <FavoriteBorderOutlinedIcon />
                    </NavLink>

                    <NavLink to="/" className={'orders-button'}>
                        <div>Orders</div>
                    </NavLink>

                </div>

                <div className='avatar-logo-container'>
                    <NavLink to="/explore"> <img src={userImg} alt="user img" className='user-profile-img' /> </NavLink>
                </div>

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

            </nav>
            <h1>frayerr<span>.</span></h1> */}
            </header>
        </div>
    )
}