// import { Link } from 'react-router-dom'
import CarouselItem from './carousel-item'
import { Carousel } from './Carousel'


export function GigPreview({ gig, onRemoveGig, onUpdateGig, onAddToCart }) {


    return (
        <li className="gig-preview">
            <div className="gig-img">
                <Carousel onGoToDetails={onGoToDetails} gig={gig}>
                    {gig.imgUrls.slice(0, 5).map((imgUrl, idx) => <CarouselItem key={idx} imgUrl={imgUrl}></CarouselItem>)}
                </Carousel>
            </div>
            
        <h4>{gig.title}</h4>
        <small>description: <span>{gig.description}</span></small>
        <h1>⛐</h1>
        <p>Price: <span>${gig.price.toLocaleString()}</span></p>
        <small>daysToMake: <span>{gig.daysToMake}</span></small>
        <p>Owner: <span>{gig.owner && gig.owner.fullname}</span></p>
        <small>level: <span>{gig.owner && gig.owner.level}</span></small>
        <p>rate: <span>{gig.owner && gig.owner.rate}</span></p>
        <div>
            <button onClick={() => { onRemoveGig(gig._id) }}>x</button>
            <button onClick={() => { onUpdateGig(gig) }}>Edit</button>
        </div>

        <button className="buy" onClick={() => { onAddToCart(gig) }}>Add to Cart</button>
    </li>
    )
}
