import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { toggleJoinModal, toggleLoginModal } from '../store/system.actions'
import { onLogout } from '../store/user.actions'
import React from "react"

export const NavBar = (props) => {
    const user = useSelector(state => state.userModule.user)
    const dispatch = useDispatch()

    return (
        <section className={`nav-bar-containter ${props.classProp}`} >
            <header className="menu-header">

                {!user &&
                    <React.Fragment>
                        <NavLink to="/" className='nav-bar-join-button'>
                            <div className="nav-bar-join-button-txt" onClick={() => { dispatch(toggleJoinModal()) }} >Join frayerr</div>
                        </NavLink>

                        <NavLink to="/" >
                            <div className="nav-bar-signin-button" onClick={() => { dispatch(toggleLoginModal()) }}>Sign in</div>
                        </NavLink>
                    </React.Fragment>
                }

            </header>

            <nav className="menu-nav">
                <NavLink to="/" >
                    <div>Home</div>
                </NavLink>

                <NavLink to="/explore" >
                    <div>Explore</div>
                </NavLink>

                <NavLink to="/" >
                    <div>Inbox</div>
                </NavLink>

                <NavLink to="/" >
                    <div>Manage Orders</div>
                </NavLink>

                {/* <NavLink to="/" >
                    <div>Categories</div>
                </NavLink> */}

                {user &&
                    <NavLink to="/" >
                        <div onClick={() => dispatch(onLogout())}>Logout</div>
                    </NavLink>
                }
            </nav>
        </section>
    )
}