import { connect } from 'react-redux';
import { useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import CloseIcon from '@mui/icons-material/Close';
// import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js';
import { toggleSignInModal, toggleJoinModal } from '../store/system.actions'
import { onSignup, googleLogin } from '../store/user.actions'

function _Signup({ onSignup, toggleSignInModal, toggleJoinModal, googleLogin }) {

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

    const onSignIn = () => {
        toggleJoinModal(false);
        toggleSignInModal(true);
    }
    const handleGoogleSignup = async (response) => {
        const googleUser = response.profileObj;
        const ans = await googleLogin(googleUser.googleId);
        if (ans) {
            // showSuccessMsg(`${ans.username} logged successfuly`);
            toggleJoinModal();
        }
        else {
            var tempUser = {
                fullname: googleUser.name,
                username: googleUser.email,
                password: "secret",
                imgUrl: googleUser.imageUrl,
                googleId: googleUser.googleId
            }
            const joinedUser = await onSignup(tempUser);
            // if (!joinedUser) showErrorMsg("Failed google login...");
            // showSuccessMsg(`${tempUser.username} logged successfuly`);
            toggleJoinModal();
        }
    }
    const handleError = (err) => {
        console.log(err);
    }
    return (
        <section className="sign-modal">
            <div className='btn-close-sign' onClick={() => toggleJoinModal(false)}><CloseIcon /></div>
            <div className="modal-content">
                <header >
                    <h1 className="modal-title">Join dimerr</h1>
                </header>
                <div className="social-tab">
                    <GoogleLogin
                        clientId={process.env.REACT_APP_CLIENT_ID}
                        onSuccess={handleGoogleSignup}
                        onFailure={handleError}
                        // isSignedIn={true}
                        cookiePolicy={'single_host_origin'}
                        className="social-btn"
                    ><p>Continue with Google</p></GoogleLogin >
                    <div className="seperator">
                        <span>OR</span>
                    </div>
                </div>
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
                    <p className="siginig-agree">By joining I agree to receive dimes from dimerr.</p>
                </form>
            </div>
            <footer>
                <div className="sign-in-footer flex">
                    <p>Already a member?</p>
                    <button onClick={() => onSignIn()}>Sign in</button>
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
    toggleSignInModal,
    googleLogin
}

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)