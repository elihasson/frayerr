import { NavLink } from "react-router-dom"

export const ProfileMenu = ({ onLogout, user, closeProfileMenu }) => {
    return (
        <aside className="profile-menu">
            <div className="menu-pointer"></div>
            <ul className="clean-list profile-scroll">
                <li className="menu-item" onClick={() => closeProfileMenu()}>
                    {/* currently /user/${user._id} instead of profile/${user._id} */}
                    <NavLink className="clean-link" to={`/`}>Home
                    </NavLink>
                </li>
                <li className="menu-item" onClick={() => closeProfileMenu()}>
                    {/* currently /user/${user._id} instead of profile/${user._id} */}
                    <NavLink className="clean-link" to={`/explore`}>Explore
                    </NavLink>
                </li>
                <li className="menu-item" onClick={() => closeProfileMenu()}>
                    {/* currently /user/${user._id} instead of profile/${user._id} */}
                    <NavLink className="clean-link" to={`/user/${user._id}`}>Profile
                    </NavLink>
                </li>
                <li className="menu-item" onClick={() => closeProfileMenu()}>
                    {/* currently /user/${user._id} instead of dashboard/${user._id} */}
                    <NavLink
                        className="clean-link" to={`/user/${user._id}`}>Dashboard
                    </NavLink>
                </li>
                <li className="menu-item logout" onClick={() => onLogout()}>
                    <NavLink className="clean-link" to={`/`}>Logout
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}