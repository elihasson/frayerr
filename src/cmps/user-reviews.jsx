import React from 'react'
import StarIcon from '@mui/icons-material/Star'
import { useEffect, useState } from 'react'
import { ProgressBar } from './progress-bar'
import { userService } from '../services/user.service'

// import { ReviewAdd } from './review-add'
import { UserRateStars } from './user-rate-stars'
import { ReviewPreview } from './review-preview'

export const UserReviews = ({ owner, gig}) => {

    const [currOwner, setCurrOwner] = useState([])

    useEffect(() => {
        async function fetchData() {
            let tmpOwner = await userService.getById(owner._id)
            setCurrOwner(tmpOwner)
        }

        fetchData()

    }, [])


    // const [isToggleReviewAdd, setReviewAdd] = useState(false)
    // const avgRate = getAvgRate()

    // function getAvgRate() {
    //     if (!owner.reviews.length) return ''
    //     const acc = owner.reviews.reduce((acc, review) => {
    //         acc += +review.rate
    //         return acc
    //     }, 0)
    //     gig.owner.rate = (acc / owner.reviews.length).toFixed(1)
    //     return (acc / owner.reviews.length).toFixed(1)
    // }

    if (!currOwner) return <React.Fragment></React.Fragment>

    return (
        <section className="review-section inpage-nav" id="Reviews">
            <div className="stats-container">
                <div className="left-side-container">
                    <div className="review-header">
                        <div className="number-of-reviews">
                            <span> {currOwner?.reviews?.length} </span>
                            Reviews
                        </div>
                        <div className="stars">
                            <UserRateStars owner={currOwner?.reviews} gig={gig} isReviews={true} />
                            {/* <span className="num-of-rating">{avgRate}</span> */}
                        </div>
                    </div>
                    <ProgressBar reviews={currOwner?.reviews} />
                </div>
                <div className="right-side-container">
                    <h4>Rating Breakdown</h4>
                    <ul className="clean-list">
                        <div className="line">
                            <li>Seller communication level</li>
                            <div className="star-rate">
                                <span>4.1</span>
                                <span className="star"><StarIcon /></span>
                            </div>
                        </div>
                        <div className="line">
                            <li>Recommend to a friend</li>
                            <div className="star-rate">
                                <span>4.6</span>
                                <span className="star"><StarIcon /></span>
                            </div>
                        </div>
                        <div className="line">
                            <li>Service as described</li>
                            <div className="star-rate">
                                <span>4.5</span>
                                <span className="star"><StarIcon /></span>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            {/* <button onClick={() => {
                setReviewAdd(!isToggleReviewAdd)
            }} className="add-review-btn">{isToggleReviewAdd ? 'Close' : 'Add Review'}</button>
            {isToggleReviewAdd && <ReviewAdd owner={owner} loadOwner={loadOwner} gigId={gig._id} setReviewAdd={setReviewAdd}/>} */}

            <div className="list-of-reviews">
                {currOwner?.reviews?.map(review => <ReviewPreview key={review._id} review={review} />)}
            </div>
        </section>
    )
}