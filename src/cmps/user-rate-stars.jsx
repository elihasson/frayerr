import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export function UserRateStars({ gig }) {
    const stars = [<StarIcon fontSize="small" />, <StarIcon fontSize="small"/>, <StarIcon fontSize="small"/>, <StarIcon fontSize="small"/>, <StarIcon fontSize="small"/>]

    if (!gig.owner) return <React.Fragment></React.Fragment>
    return (
        <div className='stars'>
            {stars.map((star, idx) => {
                if (idx < (gig.owner.rate)) return <span key={idx} className='star'>{star}</span>
                else return <span key={idx} className='star fs14'><StarOutlineIcon fontSize="small"/></span>
            })}
        <span className='rate'>{gig.owner.rate}</span>
        </div>
    )
}