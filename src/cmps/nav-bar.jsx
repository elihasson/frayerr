
export const NavBar = (props) => {
    return (
        <section className={`nav-bar-containter ${props.classProp}`} >
            <div>Home</div>
            <div>Inbox</div>
            <div>Manage Orders</div>
        </section>
    )
}