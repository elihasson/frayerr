import StarIcon from '@mui/icons-material/Star';



export function ReviewPreview({ review }) {

    return (
        <div className='review-preview'>
            <header>
                <div className="reviewer-info">
                    <span className="reviewer-name">{review.name}</span>
                    <div className="star-rate">
                        <span className='star'><StarIcon /></span>
                        <span className="num-of-rating">{review.rate}</span>
                    </div>
                </div>
                <div className="origin-area">
                    <img className='flag' src={review.flag} alt="flag" />
                    <div className="reviewer-origin">{review.country}</div>
                </div>
            </header>
            <div className="review-desc">
                <p>{review.review}</p>
            </div>

        </div>
    )
}