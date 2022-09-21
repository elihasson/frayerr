import { NavLink } from "react-router-dom"

export const NavBar = (props) => {
    return (
        <section className={`nav-bar-containter ${props.classProp}`} >
            <header className="menu-header">

                <NavLink to="/" className='nav-bar-join-button'>
                    <div className="nav-bar-join-button-txt"  >Join frayerr</div>
                </NavLink>

                <NavLink to="/" >
                    <div className="nav-bar-signin-button"  >Sign in</div>
                </NavLink>

            </header>

            <nav className="menu-nav">
                <NavLink to="/" >
                    <div>Home</div>
                </NavLink>

                <NavLink to="/" >
                    <div>Inbox</div>
                </NavLink>

                <NavLink to="/" >
                    <div>Manage Orders</div>
                </NavLink>

                <NavLink to="/" >
                    <div>Categories</div>
                </NavLink>
            </nav>
        </section>
    )
}