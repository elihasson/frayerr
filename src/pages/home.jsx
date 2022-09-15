import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { ReviewFilterBtns } from "../cmps/review-filter-btns"
import { UserAuth } from "../cmps/user-auth"
import { reviewService } from "../services/review.service"
import { getCreatedTime } from "../services/util.service"

export const Home = () => {
    const user = useSelector(state => state.userModule.user)
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        if (user) {
            reviewService.query({ byUserId: user._id })
                .then(reviews => setReviews(reviews))
        }
    }, [user])

    const onRemoveReview = async (reviewId) => {
        try {
            await reviewService.remove(reviewId)
            const newReviews = reviews.filter(r => r._id !== reviewId)
            setReviews(newReviews)
        } catch (err) {
            console.log(err)
        }
    }

    const onFilterBy = async (filterBy = {}) => {
        filterBy.byUserId = user._id
        const reviews = await reviewService.query(filterBy)
        setReviews(reviews)
    }
    return (
        <section className='home'>
            <UserAuth />
            {user &&
                <section>
                    <img src={user.imgUrl} className="user-signup-img" />
                    <h1>Hello {user.fullname}</h1>
                    <h1>your reviews</h1>

                    {reviews &&
                        <>
                            <ReviewFilterBtns userId={user._id} onFilterBy={onFilterBy} />
                            <section className="reviews-container">
                                {reviews.map(r => (
                                    <article key={r._id}>
                                        <h3>{r.txt}</h3>
                                        <h3>Prod.name : {r.toy.name}</h3>
                                        <h5>{getCreatedTime(r.createdAt)}</h5>
                                        <button onClick={() => onRemoveReview(r._id)}>Remove</button>
                                    </article>
                                ))}
                            </section>
                        </>
                    }

                </section>
            }

        </section>
    )

}



// import { Component } from 'react'

// export class Home extends Component {
//     render() {
//         return (
//             <section className='home'>
//                 Home
//             </section>
//         )
//     }
// }