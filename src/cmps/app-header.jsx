import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MenuIcon from '@mui/icons-material/Menu';

import userImg from '../assets/img/profile_img_test.jpeg'

import routes from '../routes'


import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import { GigFilter } from './gig-filter'
import { NavBar } from './nav-bar.jsx'
import { LoginSignup } from './login-signup.jsx'

export const AppHeader = (props) => {

    const { users, user, count } = useSelector(state => state.userModule)
    const isLoading = useSelector(state => state.systemModule.isLoading)
    const dispatch = useDispatch()

    let color = ''
    let show = true

    const openMenu = () => {
        console.log('Click open menu')
    }

    return (
        <header className="app-header " >
            <div>
                {!show && <NavBar />}
            </div>

            {show && <div className="burger-button-container">
                <button className="burger-button" onClick={openMenu}><MenuIcon className="burger-button-icon"></MenuIcon></button>
            </div>}

            <NavLink to="/" className={`frayerr-logo ${color}`}>
                <div>frayerr<span>.</span></div>
            </NavLink>

            <div>
                <GigFilter />
            </div>

            <div className='icon-search-bar-container'>
                <NotificationsNoneOutlinedIcon />
                <MailOutlineOutlinedIcon />
                <FavoriteBorderOutlinedIcon />
            </div>

            <div>
            <NavLink to="/"> <img src={userImg} alt="user img" className='user-profile-img' /> </NavLink>
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
    )
}