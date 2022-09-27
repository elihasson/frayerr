import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export function UserRateStars({ gig }) {
    const stars = [<StarIcon fontSize="inherit" />, <StarIcon fontSize="inherit" />, <StarIcon fontSize="inherit" />, <StarIcon fontSize="inherit" />, <StarIcon fontSize="inherit" />]
    // let rate = 0

    // if (!gig.owner && !user) return <React.Fragment></React.Fragment>
    // (!gig.owner.rate) ? rate = gig.owner.rate : rate = user.rate
    
    if (!gig.owner) return <React.Fragment></React.Fragment>

    return (
        <div className='stars'>
            {stars.map((star, idx) => {
                // if (idx < rate) return <span key={idx} className='star'>{star}</span>
                if (idx < (gig.owner.rate)) return <span key={idx} className='star'>{star}</span>
                else return <span key={idx} className='star'><StarOutlineIcon fontSize="inherit" /></span>
            })}
            <span className='rate'>{gig.owner.rate}</span>
        </div>
    )
}