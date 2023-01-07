import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check';
import { UserRateStars } from '../cmps/user-rate-stars'
import { userService } from "../services/user.service";
import { UserInfoCard } from '../cmps/user-info-card'





export const UserBackOffice = (props) => {
    const navigate = useNavigate()
    const user = useSelector(state => state.userModule.user)

    // const [user, setUser] = useState([])
    const params = useParams()


    // useEffect(() => {

    //     async function fetchData() {
    //         let currUser = await userService.getById(params.userId)
    //         console.log('uu2', currUser);

    //         setUser(currUser)
    //     }

    //     fetchData()
    // }, [])


    if (!user) return <div>..Loading</div>
    // console.log('uu', user);


    return (
        <section className='back-office-container main-layout flex column'>
            <div className="user-info flex">
                <UserInfoCard user={user} />
                <div className='active-gigs-container'>
                    <div className='active-gigs-title'></div>
                    <div className='active-gigs'></div>
                </div>
            </div>

            {/* <div className={connectedClass}></div> */}
            {/* </div> */}
            {/* <div className="profile-main-container max-width-container equal-padding"> */}
            {/* {user.sellerInfo && <GigList gigs={gigs} />} */}
            {/* </div> */}
            <div className='backoffice-btns flex'>
                <button className="btn" onClick={() => navigate(`/edit`)}>Create gig</button>
                <button className="btn" onClick={() => navigate(`/user/${user._id}/order`)}>Gig orders</button>
                <button className="btn" onClick={() => navigate(`/user/${user._id}/purchase`)}>Gigs purchased</button>
                <button className="btn" onClick={() => navigate(`/user/${user._id}/gig`)}>My gigs</button>
            </div>
        </section>
    )
}