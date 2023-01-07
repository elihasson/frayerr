import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { onLogin, onSignup } from '../store/user.actions'
import { toggleLoginModal, toggleJoinModal, closeLoginJoinModal } from '../store/system.actions'
// import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import CloseIcon from '@mui/icons-material/Close'
import { userService } from '../services/user.service'

export const Login = () => {

    const [credentials, setUser] = useState({ username: '', password: '' })
    const dispatch = useDispatch()


    const handleSubmit = async (ev) => {
        ev.preventDefault()
        if(!credentials) return 
        console.log('ev:', ev)
        try{
            const user = await userService.login(credentials)
            dispatch(onLogin(user))
            dispatch(toggleLoginModal())
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        setUser({ ...credentials, [field]: value })
    }

    const onJoin = () => {
        dispatch(toggleJoinModal())
    }
    
    return (
        <section className="sign-modal">
            <div className='btn-close-sign' onClick={() => dispatch(closeLoginJoinModal(false))}><CloseIcon /></div>
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
                    <button onClick={() => {onJoin()}}>Join us</button>
                </div>
            </footer>

        </section >
    )
}