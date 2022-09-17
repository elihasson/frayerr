import StarIcon from '@mui/icons-material/Star'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { CarouselItem } from './carousel-item'
import { Carousel } from './Carousel'
import { Link } from 'react-router-dom'



export function GigPreview({ gig, onRemoveGig, onUpdateGig, onAddToCart }) {


    return (
        <li className="gig-preview">
            <div className="gig-img">
                <Carousel gig={gig}>
                    {gig.imgUrls[0] && gig.imgUrls.map((imgUrl, idx) => <CarouselItem key={idx} imgUrl={imgUrl}></CarouselItem>)}
                </Carousel>
            </div>
            <div className="owner-info">
                <div className="owner-name-level">
                    <h5 className='owner-name'>{gig.owner.fullname}</h5>
                    <h5 className='owner-level'>{gig.owner.level}</h5>
                </div>
            </div>
            <Link className='clean-link' to={`/explore/${gig._id}`}>
                <p className='gig-title'>{gig.title}</p>
            </Link>

            <div className='rate-wrapper'>
                {/* <p>rate: <span>{gig.owner.rate}</span></p> */}
                <span className='gig-rating'><StarIcon /> {gig.owner.rate}<span className='review-number'>(6)</span></span>
            </div>

            <div className='card-footer'>
                <button onClick={() => { onRemoveGig(gig._id) }}>x</button>
                <button onClick={() => { onUpdateGig(gig) }}>Edit</button>
                <p>STARTING AT <span>${gig.price.toLocaleString()}</span></p>
            </div>

            {/* <button className="buy" onClick={() => { onAddToCart(gig) }}>Add to Cart</button> */}
        </li>
    )
}


{/* <section className='actions'>
<button onClick={() => onRemoveToy(toy._id)}>Delete</button>
<Link to={`/toys/edit/${toy._id}`} >Edit</Link>
<Link to={`/toy/${toy._id}`} >Details</Link>
</section> */}
