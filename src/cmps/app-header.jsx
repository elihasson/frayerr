// import React from 'react'
import { useEffect, useState } from "react"

import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { NavBar } from './nav-bar.jsx'
import { GigFilter } from './gig-filter'
import { ProfileMenu } from './profile-menu'
import { toggleJoinModal, toggleLoginModal } from '../store/system.actions'
import { loadUsers, onLogout } from '../store/user.actions'

export const AppHeader = (props) => {

    const user = useSelector(state => state.userModule.user)
    const isLoading = useSelector(state => state.systemModule.isLoading)
    const isHome = useSelector(state => state.systemModule.isHome)
    const isNewOrder = useSelector(state => state.systemModule.isNewOrder)

    const dispatch = useDispatch()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    const [isScroll, setIsScroll] = useState(false)
    const [navBarOpenClassName, setNavBarOpenClassName] = useState('')


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        dispatch(loadUsers())
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
        if (isHome && isScroll && !user) return 'home-top-header-with-scroll'
        if (isHome && !user) return 'home-top-header-no-scroll'
        if (isHome && user) return 'home-top-header-with-user'
        if (!user) return 'home-top-header-with-scroll'

    }

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen)
    }

    const handleLogout = () => {
        dispatch(onLogout())
        toggleProfileMenu()
    }

    return (
        <div className={`app-header-container full main-layout ${isHomeHeaderTop()}`}>
            {isMenuOpen && <div onClick={toggleMenu} className="main-screen"></div>}

            <NavBar classProp={navBarOpenClassName} toggleMenu={toggleMenu} user={user} dispatch={dispatch} toggleJoinModal={toggleJoinModal} toggleLoginModal={toggleLoginModal} onLogout={onLogout} />

            <header className="app-header main-layout" >

                <div className='burger-icon-gig-filter-container'>
                    <div className='burger-icon-container'>
                        <div className="burger-button-container" onClick={toggleMenu}>
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19"><rect y="16" width="23" height="3" rx="1.5" ></rect><rect width="23" height="3" rx="1.5" ></rect><rect y="8" width="23" height="3" rx="1.5" ></rect></svg></div>
                        </div>

                        <NavLink to="/" className={`frayerr-logo `}>
                            <div>frayerr<span>.</span></div>
                        </NavLink>
                    </div>

                    <div className='gig-filter-container'>
                        <GigFilter />
                    </div>
                </div>

                {user && <div className='icon-search-bar-container'>

                    <NavLink to="/explore" >
                        <NotificationsNoneOutlinedIcon />
                    </NavLink>

                    <NavLink to="/explore" >
                        <MailOutlineOutlinedIcon />
                    </NavLink>

                    <NavLink to="/explore" className='favorite-icon-button'>
                        <FavoriteBorderOutlinedIcon />
                    </NavLink>

                    <NavLink to={`/user/${user._id}/order`} className='orders-button'>
                        <div>Orders</div>
                        {isNewOrder && <div className="connection-dot dot-bottom"></div>}
                    </NavLink>

                </div>}

                {(!user) && <div className='icon-search-bar-container'>

                    <NavLink to="/explore" className='explore-button'>
                        <div>Explore</div>
                    </NavLink>

                    <NavLink to="#" className='signin-button'>
                        <div onClick={() => { dispatch(toggleLoginModal()) }}>Sign in</div>
                    </NavLink>

                    <NavLink to="#" className='join-button'>
                        <div onClick={() => { dispatch(toggleJoinModal()) }}>Join</div>
                    </NavLink>

                </div>}

                {user && <div className='avatar-logo-container hovertext'
                    data-hover={`Username: ${user?.fullname}`}>
                    {/* <NavLink to={`/user/${user?._id}`}> 
                    </NavLink> */}
                    <img src={user?.imgUrl} alt="user img"
                        className='user-profile-img' onClick={toggleProfileMenu}/>
                    {/* <NavLink to="#" className='logout-button'>
                        <div onClick={() => dispatch(onLogout())}>Logout</div>
                    </NavLink> */}
                    {isProfileMenuOpen && <ProfileMenu onLogout={handleLogout} user={user} closeProfileMenu={toggleProfileMenu} />}
                </div>}

            </header>
        </div>
    )
}