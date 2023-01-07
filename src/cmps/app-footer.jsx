import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories } from '../store/gig.actions'
import { UserMsg } from './user-msg.jsx'

import { InfinitySpin } from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


export const AppFooter = () => {

    const user = useSelector(state => state.userModule.user)
    const isLoading = useSelector(state => state.systemModule.isLoading)
    const dispatch = useDispatch()

    const [isUser, setIsUser] = useState(user)

    useEffect(() => {
        dispatch(loadCategories())
    }, [])

    return (
        <section className='app-footer main-layout '>
            {isLoading &&
                <div className="loader">
                    <InfinitySpin
                        width="200"
                        color="#4fa94d"
                    />
                </div>}
            {/* <div className="border-for-footer  "></div> */}
            <div className="main-info  ">
                <div className="logo-small-container">
                    <h2>frayerr<span>®</span></h2>
                    <div className='logo-small-text'>© Frayerr International Ltd. {new Date().getFullYear()}</div>
                </div>

                <ul className='social clean-list'>
                    <li>
                        <a className='clean-link' target="_blank" href="https://www.facebook.com/" >
                            <FacebookRoundedIcon />
                        </a>
                    </li>
                    <li>
                        <a className='clean-link' target="_blank" href="https://twitter.com/explore" >
                            <TwitterIcon />
                        </a>
                    </li>
                    <li>
                        <a className='clean-link' target="_blank" href="https://www.linkedin.com/" >
                            <LinkedInIcon />
                        </a>
                    </li>
                    <li>
                        <a className='clean-link' target="_blank" href="https://www.pinterest.com/" >
                            <PinterestIcon />
                        </a>
                    </li>
                    <li className='instagram-icon'>
                        <a className='clean-link ' target="_blank" href="https://www.instagram.com/" >
                            <InstagramIcon />
                        </a>
                    </li>
                </ul>
            </div>

            {/* {user && <div>
                {console.log('user id:', user._id)}
                <ul>
                    <li>user name:{user.username}</li>
                    <li>full name:{user.fullname}</li>
                    <button onClick={() => dispatch(onLogout())}>Logout</button>
                </ul>
            </div>} */}

            <UserMsg />
        </section>
    )
}