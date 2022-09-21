import { connect } from 'react-redux';
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
// import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js';
import { toggleLoginModal, toggleJoinModal } from '../store/system.actions'
import { onSignup } from '../store/user.actions'

function _Signup({ onSignup, toggleLoginModal, toggleJoinModal,  }) {

    const [user, setUser] = useState({ fullname: '', username: '', password: '' });

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        var ans = await onSignup(user);
        // if (ans) showSuccessMsg(`${ans.username} joined successfuly!`)
        // else showErrorMsg(`Failed to Sign-up`)
        toggleJoinModal(false);
    }

    const handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        setUser({ ...user, [field]: value });
    }

    const onLogin = () => {
        toggleJoinModal(false);
        toggleLoginModal(true);
    }

    const handleError = (err) => {
        console.log(err);
    }
    return (
        <section className="sign-modal">
            <div className='btn-close-sign' onClick={() => toggleJoinModal(false)}><CloseIcon /></div>
            <div className="modal-content">
                <header >
                    <h1 className="modal-title">Join frayerr</h1>
                </header>
                <form action="" className="sign-form" onSubmit={handleSubmit}>
                    <div className="form-input-div">
                        <input required autoComplete="off" type="text" name="fullname" placeholder="Enter your full name" onChange={handleChange} className="user-input" />
                    </div>
                    <div className="form-input-div">
                        <input required autoComplete="off" type="text" name="username" placeholder="Choose a Username" onChange={handleChange} className="user-input" />
                    </div>
                    <div className="form-input-div">
                        <input required autoComplete="off" type="password" name="password" placeholder="Choose a Password" onChange={handleChange} className="user-input" />
                    </div>
                    <button className="continue-btn" type="submit">Continue</button>
                    <p className="siginig-agree">By joining I agree to the terms fo frayerr.</p>
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

function mapStateToProps({ userModule }) {
    return {
        user: userModule.user
    }
}

const mapDispatchToProps = {
    onSignup,
    toggleJoinModal,
    toggleLoginModal
}

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)