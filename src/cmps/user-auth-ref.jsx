import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useFormRegister } from "../hooks/useFormRegister"
import { userService } from "../services/user.service"
import { login, logout } from "../store/actions/user.actions"
import { Link } from "react-router-dom"
import { uploadImg } from "../services/upload.service"

export const UserAuth = () => {
    const [registerLogin, setLoginDetails, loginDetails] = useFormRegister({ username: '', password: '' })
    const [registerSignup, setSignupDetails, signupDetails] = useFormRegister({ username: '', fullname: '', password: '', imgUrl: null })
    const dispatch = useDispatch()
    const user = useSelector(state => state.userModule.user)

    const onLogin = async (ev) => {
        ev.preventDefault()
        try {
            const user = await userService.login(loginDetails)
            dispatch(login(user))
        } catch (err) {
            console.log(err)
        }
    }
    const onSignup = async (ev) => {
        ev.preventDefault()
        try {
            const user = await userService.signup(signupDetails)
            dispatch(login(user))
        } catch (err) {
            console.log(err)
        }
    }
    const onLogOut = async () => {
        await userService.logout()
        dispatch(logout())
    }
    const onImgUpload = async (ev) => {
        console.log('ev', ev)
        const imgUrl = await uploadImg(ev)
        setSignupDetails(prevDetails => ({ ...prevDetails, imgUrl }))
    }

    return (
        <section>
            {
                (!user) ? <><form >
                    <h3>Login</h3>
                    <input {...registerLogin('username', 'text')}
                        placeholder="username"
                        id="login-username" />
                    <input {...registerLogin('password', 'password')}
                        placeholder="password"
                        id="login-pass" />
                    <button onClick={onLogin}>
                        submit
                    </button>
                </form>
                    <form >
                        <h3>signup</h3>
                        <input {...registerSignup('username', 'username')}
                            placeholder="username" />
                        <input {...registerSignup('fullname', 'fullname')}
                            placeholder="fullname" />
                        <input {...registerSignup('password', 'password')}
                            placeholder="password" />
                        <input type="file" onChange={onImgUpload} />
                        <img src={signupDetails.imgUrl} alt="upload an image" className="user-signup-img" />
                        <button onClick={onSignup}>
                            submit
                        </button>
                    </form></>
                    : <>
                        <button onClick={onLogOut}>Logout</button>

                        {user.isAdmin && <Link to="/toys/admin">Admin page</Link>}
                    </>
            }


        </section >

    )
}