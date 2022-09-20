import { connect } from 'react-redux'
import { useState } from 'react'
import { onLogin, googleLogin, onSignup } from '../store/user.actions'
import { toggleLoginModal, toggleJoinModal } from '../store/system.actions'
// import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
// TODO: import google Login cmp from an npm library 
import CloseIcon from '@mui/icons-material/Close'

function _Login({ toggleLoginModal, onLogin, toggleJoinModal, googleLogin, onSignup }) {

    const [user, setUser] = useState({ username: '', password: '' })

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        const ans = await onLogin(user)
        // if (ans) {
        //     showSuccessMsg(`user ${ans.username} signed in`)
        // }
        // else {
        //     showErrorMsg('failed to login...')
        // }
        toggleLoginModal(false)
    }

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        setUser({ ...user, [field]: value })
    }

    const onJoin = () => {
        toggleLoginModal(false)
        toggleJoinModal(true)
    }
    // const responseGoogle = (response) => {
    //     console.log(response)
    // }
    // const handleLogin = async (response) => {
    //     const googleUser = response.profileObj
    //     const ans = await googleLogin(googleUser.googleId)
    //     if (ans) {
    //         // showSuccessMsg(`${ans.username} logged successfuly`)
    //         toggleLoginModal()
    //     }
    //     else {
    //         var tempUser = {
    //             fullname: googleUser.name,
    //             username: googleUser.email,
    //             password: "secret",
    //             imgUrl: googleUser.imageUrl,
    //             googleId: googleUser.googleId
    //         }
    //         const joinedUser = await onSignup(tempUser)
    //         // if (!joinedUser) showErrorMsg("Failed google login...")
    //         // showSuccessMsg(`${tempUser.username} logged successfuly`)
    //         toggleLoginModal()
    //     }
    // }
    return (
        <section className="sign-modal">
            <div className='btn-close-sign' onClick={() => toggleLoginModal(false)}><CloseIcon /></div>
            <div className="modal-content">
                <header >
                    <h1 className="modal-title">Sign in to dimerr</h1>
                </header>
                <div className="social-tab">
                    {/* <GoogleLogin
                        clientId={process.env.REACT_APP_CLIENT_ID}
                        onSuccess={handleLogin}
                        onFailure={responseGoogle}
                        // isSignedIn={true}
                        cookiePolicy={'single_host_origin'}
                        className="social-btn"
                    ><p>Continue with Google</p>
                    </GoogleLogin > */}
                    <div className="seperator">
                        <span>OR</span>
                    </div>
                </div>
                <form action="" className="sign-form" onSubmit={handleSubmit}>
                    <div className="form-input-div">
                        <input required autoComplete="off" type="text" name="username" placeholder="Enter Username" onChange={handleChange} className="user-input" />
                    </div>
                    <div className="form-input-div">
                        <input required type="password" name="password" placeholder="Enter Password" onChange={handleChange} className="user-input" />
                    </div>
                    <button className="continue-btn" type="submit">Login</button>
                </form>
            </div>
            <footer>
                <div className="sign-in-footer flex">
                    <p>Not a member yet?</p>
                    <button onClick={() => { onJoin() }}>Join us</button>
                </div>
            </footer>

        </section >
    )
}

function mapStateToProps({ userModule }) {
    return {
        user: userModule.user
    }
}
const mapDispatchToProps = {
    onLogin,
    toggleLoginModal,
    toggleJoinModal,
    googleLogin,
    onSignup
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)