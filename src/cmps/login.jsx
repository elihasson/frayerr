import { connect } from 'react-redux'
import { useState } from 'react'
import { onLogin, onSignup } from '../store/user.actions'
import { toggleLoginModal, toggleJoinModal } from '../store/system.actions'
// import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import CloseIcon from '@mui/icons-material/Close'

function _Login({ toggleLoginModal, onLogin, toggleJoinModal, onSignup }) {

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
    
    return (
        <section className="sign-modal">
            <div className='btn-close-sign' onClick={() => toggleLoginModal(false)}><CloseIcon /></div>
            <div className="modal-content">
                <header >
                    <h1 className="modal-title">Sign in to frayerr</h1>
                </header>
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
    onSignup
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)