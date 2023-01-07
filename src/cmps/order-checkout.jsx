//setExplore setBecomeSeller setProfile setDetails, setHomePage
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check';
import { UserRateStars } from '../cmps/user-rate-stars'
import { gigService } from "../services/gig.service";
import { userService } from "../services/user.service";
import { orderService } from "../services/order.service";
// import { addOrder } from '../store/order.actions';
// import { toggleJoinModal, setHomePage } from '../store/system.actions'
// import { socketService } from "../services/socket.service";
// import { utilService } from "../services/util.service";
import { loadGig } from '../store/gig.actions'
import { addOrder } from '../store/order.actions'
import { socketService, SOCKET_EMIT_ORDER_ADDED } from '../services/socket.service';


export const OrderCheckout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loggedinUser = useSelector(state => state.userModule.user)
    const gig = useSelector(state => state.gigModule.watchedGig)
    const categories = useSelector(state => state.gigModule.categories)

    const [features, setFeatures] = useState([])
    const params = useParams()

    console.log('gig:', gig)
    console.log('categories:', categories)

    useEffect(() => {
        dispatch(loadGig(params.gigId))
        _getFeaturesByCategory(gig?.category)
    }, [categories])

    const _getFeaturesByCategory = (categoryName) => {
        const featuresObj = categories.filter(category => category.title === categoryName)
        setFeatures(featuresObj[0]?.features)
    }

    const onSetOrder = async () => {
        dispatch(addOrder([],gig))

        const from = loggedinUser?.fullname
        socketService.emit(SOCKET_EMIT_ORDER_ADDED, { from, gig })

        navigate(`/user/${loggedinUser._id}/purchase`)
    }

    if (!gig) return <div>Loading...</div>

    const image = gig?.imgUrls?.[0]?.imgUrl

    return (
        <section className='checkout main-layout ' >
            <div className="left-side-container">
                <div className="main-content-container">
                    <div className="img-container">
                        {/* <img src={gig.imgUrls[0].imgUrl} alt="first image"></img> */}
                        <img src={image} alt="first image"></img>
                    </div>
                    <div className="main">
                        <h3>{gig.title}</h3>
                        <div className="star-rate-container">
                            <UserRateStars gig={gig} />
                            {/* <span className='num-of-rating'>{this.getAvgRate()}</span> */}
                            {/* <span className='review-length'>({owner.reviews.length})</span> */}
                        </div>
                    </div>
                    <div className="price">{(gig.price + 0).toLocaleString("USA", { style: "currency", currency: "USD" })}</div>
                </div>
                <div className="details">
                    <h2>Order Details</h2>
                    {/* <p>{() => {trimIWill()}}</p> */}
                    <div className='order-features'>
                        <ul className='clean-list'>
                            {features?.map((feature, idx) => {
                                return (<li key={idx}>
                                    <CheckIcon className="check-icon" />
                                    {feature}
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>
            </div >
            <div className="right-side-container">
                <div className="order-modal sticky">
                    <h3>Price summary</h3>
                    <ul className='clean-list'>
                        <li>Subtotal
                            <span> {(+gig.price).toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
                        </li>
                        <li>Service Fee
                            <span> {(gig.price * 0.05).toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
                        </li>
                        <li className='bold'>
                            Total
                            <span> {(gig.price + (gig.price * 0.05)).toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
                        </li>
                        {/* <li> Delivery Time
                            <div className="li-inner-container">
                                <span>{+gig.daysToMake}</span>
                                <span> {+gig.daysToMake === 1 ? 'day' : 'days'}</span>
                            </div>
                        </li> */}
                    </ul>
                    
                    <button className='btn' onClick={onSetOrder}>Purchase</button>
                </div>

                {/* <div>{gig && <div><pre>{JSON.stringify(gig, null, 2)}</pre>
                    <p>{JSON.stringify(features, null, 2)}
                        {JSON.stringify(categories.map((category) => gig.category.title, null, 2))}</p></div>}</div> */}
            </div>

        </section>
    )

}

const trimIWill = () => {
    let { gig: { title } } = this.state
    title = title.trim();
    var titleToEdit = title.toLowerCase();
    if (titleToEdit.startsWith('i will')) {
        title = title.slice(7);
        title = title.charAt(0).toUpperCase() + title.slice(1);
    }
    return title;
}
