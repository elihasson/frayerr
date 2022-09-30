import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { toggleJoinModal, toggleLoginModal } from '../store/system.actions'
import { onLogout } from '../store/user.actions'
import React from "react"

export const NavBar = ({classProp, toggleMenu}) => {
    const user = useSelector(state => state.userModule.user)
    const dispatch = useDispatch()

    const handleJoinModal = () => {
        dispatch(toggleJoinModal())
        toggleMenu()
    }

    const handleLoginModal = () => {
        dispatch(toggleLoginModal())
        toggleMenu()
    }

    const handleLogout = () => {
        dispatch(onLogout())
        toggleMenu()
    }

    return (
        <section className={`nav-bar-containter ${classProp}`} >
            <header className="menu-header">

                {!user &&
                    <React.Fragment>
                        <NavLink to="/" className='nav-bar-join-button'>
                            <div className="nav-bar-join-button-txt" onClick={handleJoinModal} >Join frayerr</div>
                        </NavLink>

                        <NavLink to="/" >
                            <div className="nav-bar-signin-button" onClick={handleLoginModal}>Sign in</div>
                        </NavLink>
                    </React.Fragment>
                }

            </header>

            <nav className="menu-nav">
                <NavLink to="/" >
                    <div onClick={toggleMenu}>Home</div>
                </NavLink>

                <NavLink to="/explore" >
                    <div onClick={toggleMenu}>Explore</div>
                </NavLink>

                <NavLink to="/" >
                    {/* currently just closes navbar */}
                    <div onClick={toggleMenu}>Inbox</div>
                </NavLink>

                <NavLink to="/" >
                    {/* currently just closes navbar */}
                    <div onClick={toggleMenu}>Manage Orders</div>
                </NavLink>

                {/* <NavLink to="/" >
                    <div>Categories</div>
                </NavLink> */}

                {user &&
                    <NavLink to="/" >
                        <div onClick={handleLogout}>Logout</div>
                    </NavLink>
                }
            </nav>
        </section>
    )
}