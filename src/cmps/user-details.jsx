import { UserRateStars } from './user-rate-stars'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'



// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PersonIcon from '@mui/icons-material/Person';

export function UserDetails({ user }) {       
    const gig = { owner: { rate: user.rate } }
    return (
        <div className="user-details max-width-container equal-padding">
            <div className="user-stats-wrapper">
                <h2>user details</h2>
                {/* <span className={`online-status ${isOnline && 'online'}`}>{isOnline ? 'online' : 'offline'}</span> */}
                {/* <UserProfileImg setIsOnline={setIsOnline} user={user} isLink={false} /> */}
                <h3 className="fullname">{user.fullName}</h3>
                {user && <UserRateStars gig={gig} owner={user} />}
            </div>
            <div className="user-info-wrapper">
                <div className="user-stats">
                    {/* {user.sellerInfo && <div className='origin-wrapper'>
                        <div><LocationOnIcon /> From</div>
                        <div className='origin'> {user.sellerInfo.origin}</div>
                    </div>} */}
                    </div>
                </div>
            </div>
    )
}

        // username: user.username,
        // fullname: user.fullname,
        // imgUrl: user.imgUrl,
        // level: user.level,
        // rate: user.rate