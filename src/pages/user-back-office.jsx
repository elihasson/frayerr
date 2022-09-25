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
                <button className="btn" onClick={() => navigate(`/edit`)}>create gig</button>
                <button className="btn" onClick={() => navigate(`/user/${user._id}/order`)}>Show orders</button>
                <button className="btn" onClick={() => navigate(`/user/${user._id}/gig`)}>User Gigs</button>
            </div>
        </section>
    )
}




// import React, { useState, useEffect } from 'react'
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom';

// import { userService } from '../services/user.service';
// import { gigService } from '../services/gig.service';

// import { GigList } from '../cmp/GigList'
// import { UserInfoCard } from '../cmp/profile/UserInfoCard'
// import { setHome, setExplore, setDetails, setProfile } from '../store/scss.action.js';
// import { Loader } from '../cmp/utils/Loader';

// function _UserProfile(props) {
//     const { setHome, setExplore, setDetails, setProfile, match, loggedInUser } = props
//     const [gigs, setGigs] = useState([]);
//     const [user, setUser] = useState(null);
//     useEffect(async () => {
//         setExplore(false);
//         setHome(false);
//         setDetails(false)
//         setProfile(true);
//         onSetGigs(await onSetUser());
//     }, [])

//     useEffect(async () => {
//         if (!user) return;
//         if (user._id !== props.match.params.userId) onSetGigs(await onSetUser());
//     }, [props.match.params.userId])

//     async function onSetUser() {
//         const userToSet = await userService.getById(match.params.userId)
//         setUser(userToSet);
//         return userToSet;
//     }
//     async function onSetGigs(user) {
//         const gigs = await gigService.query({ userId: user._id })
//         setGigs(gigs);
//     }
//     if (!user) return <Loader></Loader>
//     return (
//         <div className="profile-back-container">
//             <div className="profile-main-container max-width-container equal-padding">
//                 <UserInfoCard user={user} />
//                 {user.sellerInfo && <GigList gigs={gigs} />}
//             </div>
//         </div>
//     )
// }

// function mapStateToProps(state) {
//     return {
//         loggedInUser: state.userModule.user,
//     }
// }



// const mapDispatchToProps = {
//     setDetails,
//     setExplore,
//     setHome,
//     setProfile,
// };

// const _UserProfileWithRouter = withRouter(_UserProfile);
// export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfileWithRouter)