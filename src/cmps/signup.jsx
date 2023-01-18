import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from '../cmps/img-uploader'
import { useDispatch } from 'react-redux'
import { toggleLoginModal, toggleJoinModal, closeLoginJoinModal } from '../store/system.actions'
import { onSignup  } from '../store/user.actions'
import CloseIcon from '@mui/icons-material/Close'

// import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'

export const Signup = () => {

    const dispatch = useDispatch()

    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getData() {
            const users = await userService.getUsers()
            setUsers(users)
        }
    }, [])

    const clearState = () => {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        setCredentials({ ...credentials, [field]: value })
        setIsSignup(false)
    }

    const handleSignup = (ev = null) => {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        dispatch(onSignup(credentials))
        clearState()
        dispatch(toggleJoinModal())
    }

    const onLogin = () => {
        dispatch(toggleLoginModal())
    }

    return (
        <section className="sign-modal">
            <div className="btn-close-sign" onClick={() => dispatch(closeLoginJoinModal())}><CloseIcon /></div>
            <div className="modal-content">
                <header >
                    <h1 className="modal-title">Join frayerr</h1>
                </header>
                <form action="" className="sign-form" onSubmit={handleSignup}>
                    <div className="form-input-div">
                        <input required autoComplete="off"
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Enter your full name"
                            onChange={handleChange}
                            className="user-input" />
                    </div>
                    <div className="form-input-div">
                        <input required autoComplete="off"
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Choose a Username"
                            onChange={handleChange}
                            className="user-input" />
                    </div>
                    <div className="form-input-div">
                        <input required autoComplete="off"
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Choose a Password"
                            onChange={handleChange}
                            className="user-input" />
                    </div>
                    <button className="continue-btn" type="submit">Join</button>
                    <p className="siginig-agree">By joining I agree to the terms of frayerr.</p>
                </form>
            </div>
            <footer>
                <div className="sign-in-footer flex">
                    <p>Already a member?</p>
                    <button onClick={() => onLogin()}>Sign in</button>
                </div>
            </footer>

        </section>
    )
}

// function mapStateToProps(state) {
//     return {
//         users: state.userModule.users,
//         user: state.userModule.user,
//         isLoading: state.systemModule.isLoading
//     }
// }
// const mapDispatchToProps = {
//     onSignup,
//     toggleLoginModal,
//     toggleJoinModal
// }

// export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)