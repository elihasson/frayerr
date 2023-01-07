import React, { useState } from "react";
import { utilService } from "../services/util.service";
// import { UserProfileImg } from '../profile/UserProfileImg'
import { UserRateStars } from "./user-rate-stars";


export function AboutSeller({ gig, owner }) {
    const [isOnline, setIsOnline] = useState(false);

    if (!owner) return <React.Fragment></React.Fragment>
    
    let levelClass, levelDesc
    if (owner?.rate < 4) {
        levelClass = ''
        levelDesc = 'Level 2 Seller'
    } else {
        levelClass = 'top'
        levelDesc = 'Top Rated Seller'
    }

    return (
        <div className='about-seller inpage-nav' id="AboutSeller">
            <h2 className='about-seller-header'>About the Seller</h2>
            <div className="seller-info">
                <div className="container-user-img">
                    {owner.imgUrl &&
                        <div className="user-img" style={{ backgroundImage: `url(${owner.imgUrl})` }}>
                            <div className="connection-dot"></div>
                        </div>}
                </div>
                <div className="seller-name-level-rate">
                    <h5 className='owner-name'>{gig.owner?.fullname}</h5>
                    <h5 className={'owner-level ' + `${levelClass}`}>{levelDesc}</h5>
                    <UserRateStars gig={gig} />
                    <button className="btn-gray btn-contact">Contact Me</button>
                </div>
                {/* <span className={`online-status ${isOnline && 'online'}`}>{isOnline ? 'online' : 'offline'}</span> */}
                <span className='online-status online'>online</span>
            </div >
            <div className='seller-table'>
                <div className="seller-stats">
                    <div className="card">
                        <h4>From</h4>
                        {/* <h4>{owner.sellerInfo?.origin}</h4> */}
                        <h4>Israel</h4>
                    </div>
                    <div className="card">
                        <h4>Member since</h4>
                        <h4>May 2022</h4>
                    </div>
                    <div className="card">
                        <h4>Avg. response time</h4>
                        <h4>{utilService.getRandomIntInclusive(1, 4)} hours</h4>
                    </div>
                    <div className="card">
                        <h4>Last delivery</h4>
                        <h4>about {utilService.getRandomIntInclusive(1, 24)} hours</h4>
                    </div>
                    <div className="seller-desc">
                        <p>{owner.sellerInfo?.sellerDesc}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}