import { gigService } from '../services/gig.service'
import StarIcon from '@mui/icons-material/Star'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { CarouselItem } from './carousel-item.jsx'
import { Carousel } from './carousel.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { storageService } from '../services/async-storage.service'
import { setLikedGig, loadGig } from '../store/gig.actions'

export const GigPreview = ({ gig, onRemoveGig, onUpdateGig }) => {

    const user = useSelector(state => state.userModule.user)

    const dispatch = useDispatch()

    const [isLike, setLike] = useState(false)
    const [likePopupClass, setClass] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        checkIfLiked()
    }, [])

    async function checkIfLiked() {
        if (user) {
            const isUserLiked = await gigService.isLikedByUser(gig)
            setLike(isUserLiked)
        } else {
            const isGuestLiked = await storageService.isLikedByGuest(gig._id)
            setLike(isGuestLiked)
        }
    }

    async function toggleLike() {
        setLike(!isLike)
        dispatch(setLikedGig(gig, user))
        // when like/unlike - need to add/remove current user to gig.likedByUsers
    }

    const onNavToGigDetails = (gigId) => {
        navigate(`/explore/${gigId}`)
    }

    const getShortTitle = (gigTitle) => {
        if (gigTitle.length > 80) {
            return `${gigTitle.substring(0, 30)}...`
        }
        return gigTitle
    }

    return (
        <li className="gig-preview full">
            <div className="gig-img"
                onClick={() => {
                    onNavToGigDetails(gig._id)
                }}>
                <Carousel gig={gig}>
                    {gig.imgUrls[0] && gig.imgUrls.map((imgUrl, idx) => <CarouselItem key={idx} imgUrl={imgUrl}></CarouselItem>)}
                </Carousel>
            </div>
            <div className="owner-info">
                <div className="user-img" style={{ backgroundImage: `url(${gig.owner.imgUrl})` }}></div>
                <div className="owner-name-level">
                    <h5 className="owner-name">{gig.owner.fullname}</h5>
                    <h5 className="owner-level">{gig.owner.level}</h5>
                </div>
            </div>
            <Link className="clean-link" to={`/explore/${gig._id}`}>
                <p className="gig-title"> {getShortTitle(gig.title)} </p>
            </Link>

            <div className="rate-wrapper">
                {/* <p>rate: <span>{gig.owner.rate}</span></p> */}
                <div className="gig-rating">
                    <StarIcon fontSize="inherit" />
                    <span>{gig.owner.rate}</span>
                    <span className="review-number">(1k+)</span>
                </div>
            </div>

            <div className="card-footer">
                {/* <button onClick={() => { onRemoveGig(gig._id) }}>x</button> */}
                {/* <button onClick={() => { onUpdateGig(gig) }}>Edit</button> */}
                <span className={isLike ? 'like active' : 'popup like'}
                    onMouseLeave={() => {
                        setClass(false)
                    }} onMouseEnter={() => {
                        setClass(true)
                    }}
                    onClick={toggleLike}
                ><FavoriteIcon />
                    <span className={likePopupClass ? 'popuptext show' : 'popuptext'}> {!isLike ? 'Save to My list' : ''}</span>
                </span>
                <p>STARTING AT <span>${gig.price.toLocaleString()}</span></p>

            </div>

            {/* <button className="buy" onClick={() => { onAddToCart(gig) }}>Add to Cart</button> */}
        </li>
    )
}