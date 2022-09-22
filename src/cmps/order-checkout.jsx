//setExplore setBecomeSeller setProfile setDetails, setHomePage
import React, { useState, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// import CheckIcon from '@mui/icons-material/Check';
import { UserRateStars } from '../cmps/user-rate-stars'
import { gigService } from "../services/gig.service";
// import { userService } from "../services/user.service";
// import { addOrder } from '../store/order.actions';
// import { toggleJoinModal, setHomePage } from '../store/system.actions'
// import { socketService } from "../services/socket.service";
// import { utilService } from "../services/util.service";
import { loadGig } from '../store/gig.actions'


// // class _OrderCheckout extends React.Component {
export const OrderCheckout = () => {
    // const { gig } = useSelector(state => state.watchedGig)
    // const dispatch = useDispatch()
    // const [gig, setGig] = useState([])


    // const params = useParams()
    //     useEffect(() => {
        //         dispatch(loadGig(params.gigId))
        
        // }, [])
        
    // const loadGig = async (gigId) => {
    //     const gig = await gigService.getById(gigId)
    //     // this.setState(prevState => ({ ...prevState, gig }))
    // }
        
        // const  onSetOrder = async () => {
    //     const { gig, owner } = this.state
    //     const { user } = this.props
    //     if (!user) {
    //         this.props.toggleJoinModal(true);
    //         return;
    //     }
    //     const savedOrder = await this.props.addOrder(order, gig) //?
    //     const notification = {
    //         _id: utilService.makeId(8),
    //         sender: user,
    //         txt: '',
    //         type: 'new order',
    //         createdAt: Date.now(),
    //         msg: this.createMsg()
    //     }
    //     socketService.emit('new order', { savedOrder, notification })
    //     this.props.history.push(`/dashboard/${user._id}`)
    // }


    return(

        <div>checkout</div>
        // <div>
        // {gig && <div>
        //             <pre>
        //                 {JSON.stringify(gig, null, 2)}
        //             </pre>
        //         </div> }
        // </div>
        //  <section className='checkout main-layout ' >
        //     <div className="left-side-container">
        //         <div className="main-content-container">
        //             <div className="img-container">
        //                 <img src={gig.imgUrls[0]} alt="first image"></img>
        //             </div>
        //             <div className="main">
        //                 <h3>{gig.title}</h3>
        //                 <div className="star-rate-container">
        //                     <UserRateStars owner={gig.owner.reviews} gig={gig} isReviews={true} />
        //                     {/* <span className='num-of-rating'>{this.getAvgRate()}</span> */}
        //                     {/* <span className='review-length'>({owner.reviews.length})</span> */}
        //                 </div>
        //             </div>
        //             <div className="price">{gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</div>
        //         </div>
        //         <div className="details">
        //             <h2>Order Details</h2>
        //             {/* <p>{() => {trimIWill()}}</p> */}
        //             <div className='order-features'>
        //                 <ul className='clean-list'>
        //                     {/* {this.features.map((feature, idx) => {
        //                         return (<li key={idx}>
        //                             <CheckIcon className="check-icon" />
        //                             {feature}
        //                         </li>)
        //                     })} */}
        //                 </ul>
        //             </div>
        //         </div>
        //     </div >
        //     <div className="right-side-container">
        //         <div className="order-modal sticky">
        //             <h3>Price summary</h3>
        //             <ul className='clean-list'>
        //                 <li>Subtotal
        //                     <span> {gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
        //                 </li>
        //                 <li>Service Fee
        //                     <span> {(gig.price * 0.05).toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
        //                 </li>
        //                 <li className='bold'>
        //                     Total
        //                     <span> {(gig.price + (gig.price * 0.05)).toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
        //                 </li>
        //                 <li> Delivery Time
        //                     <div className="li-inner-container">
        //                         <span>{gig.daysToMake}</span>
        //                         <span> {gig.daysToMake === 1 ? 'day' : 'days'}</span>
        //                     </div>
        //                 </li>
        //             </ul>
        //             {/* <button className='btn' onClick={this.onSetOrder}>Purchase</button> */}
        //             <button className='btn'>Purchase</button>
        //         </div>
        //     </div>
        // </section>
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

//     // state = {
//     //     gig: null,
//     //     owner: null
//     // }

//     const user = useSelector(state => state.userModule.user)
//     const order = useSelector(state => state.orderModule.order)
//     const dispatch = useDispatch()
//     const params = useParams()
//     const features = params.features
//     // const [features, setFeatures] = useState([])



//     useEffect(() => {
//         loadGig(params.gigId)
//         // fixFeatures()
        
//     }, [])


//     async componentDidMount() {
//         let urlParams = new URLSearchParams(this.props.location.search);
//         this.fixFeatures()
//         this.onSetProfile();
//         await this.loadGig(gigId)
//         this.loadOwner(this.state.gig.owner._id)
//     }
//     onSetProfile = () => {
//         if (this.props.isProfile) return;
//         this.props.setHomePagePage(false);
//     }

//     // const fixFeatures = () => {
//     //     const features = params.features.split(',')
//     // }

    

//     loadOwner = async (userId) => {
//         const owner = await userService.getById(userId)
//         this.setState(prevState => ({ ...prevState, owner }))
//     }

//     getAvgRate = () => {
//         const { owner, gig } = this.state
//         if (!owner.reviews.length) return ''
//         const acc = owner.reviews.reduce((acc, review) => {
//             acc += +review.rate
//             return acc
//         }, 0)
//         gig.owner.rate = (acc / owner.reviews.length).toFixed(1)
//         return (acc / owner.reviews.length).toFixed(1)
//     }

   


//     createMsg = () => {
//         var msg = {}
//         const { user } = this.props
//         msg.title = "Received new order!"
//         msg.content = `${user.username} hired your services`
//         msg.subHeader = "Time to make some dimes..."
//         return msg;
//     }

//     const { gig, owner } = this.state
//     if (!gig || !owner) return <React.Fragment></React.Fragment>
//     return (
//         <section className='checkout max-width-container equal-padding' >
//             <div className="left-side-container">
//                 <div className="main-content-container">
//                     <div className="img-container">
//                         <img src={gig.imgUrls[0]} alt="first image"></img>
//                     </div>
//                     <div className="main">
//                         <h3>{gig.title}</h3>
//                         <div className="star-rate-container">
//                             <UserRateStars owner={owner.reviews} gig={gig} isReviews={true} />
//                             <span className='num-of-rating'>{this.getAvgRate()}</span>
//                             <span className='review-length'>({owner.reviews.length})</span>
//                         </div>
//                     </div>
//                     <div className="price">{gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</div>
//                 </div>
//                 <div className="details">
//                     <h2>Order Details</h2>
//                     <p>{this.trimIWill()}</p>
//                     <div className='order-features'>
//                         <ul className='clean-list'>
//                             {this.features.map((feature, idx) => {
//                                 return (<li key={idx}>
//                                     <CheckIcon className="check-icon" />
//                                     {feature}
//                                 </li>)
//                             })}
//                         </ul>
//                     </div>
//                 </div>
//             </div >
//             <div className="right-side-container">
//                 <div className="order-modal sticky">
//                     <h3>Price summary</h3>
//                     <ul className='clean-list'>
//                         <li>Subtotal
//                             <span> {gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
//                         </li>
//                         <li>Service Fee
//                             <span> {(gig.price * 0.05).toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
//                         </li>
//                         <li className='bold'>
//                             Total
//                             <span> {(gig.price + (gig.price * 0.05)).toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
//                         </li>
//                         <li> Delivery Time
//                             <div className="li-inner-container">
//                                 <span>{gig.daysToMake}</span>
//                                 <span> {gig.daysToMake === 1 ? 'day' : 'days'}</span>
//                             </div>
//                         </li>
//                     </ul>
//                     <button className='btn' onClick={this.onSetOrder}>Purchase</button>
//                 </div>
//             </div>
//         </section>
//     )


