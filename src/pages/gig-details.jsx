import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import { loadGig } from '../store/gig.actions'
import { CarouselItem } from '../cmps/carousel-item'
import { Carousel } from '../cmps/carousel'
import { OrderModal } from '../cmps/order-modal'
import { UserRateStars } from '../cmps/user-rate-stars'


export function _GigDetails({ gig, loadGig }) {

    const params = useParams()
    //need to be inner function if no gig
    useEffect(() => {
        loadGig(params.gigId)
    }, [])

    //component of loader
    if (!gig) return <div>Loading...</div>
    return (
        <section className="gig-details">
            <div className="gig-details-container">
                <div className='details-header inpage-nav' id='Overview'>
                    <h1 className="gig-title">{gig.title}</h1>
                    <div className="owner-info">
                        <div className="user-img" style={{ backgroundImage: `url(${gig.owner.imgUrl})` }}></div>
                        <h5 className='owner-name'>{gig.owner.fullname}</h5>
                        <h5 className='owner-level'>{gig.owner.rate}</h5>
                        <span className='spacer'>|</span>
                        <UserRateStars gig={gig} />
                        {/* <h5>stars</h5> */}
                    </div>
                </div>

                <div className="gig-img">
                    <Carousel gig={gig} isDetails={true}>
                        {gig.imgUrls[0] && gig.imgUrls.map((imgUrl, idx) => <CarouselItem key={idx} imgUrl={imgUrl} isDetails={true}></CarouselItem>)}
                    </Carousel>
                </div>
                <div className='about-gig'>
                    <h1>About this gig</h1>
                    <p>
                        {gig.description}
                    </p>
                </div>




                {/* {gig && <div>
                    <pre>
                        {JSON.stringify(gig, null, 2)}
                    </pre>
                </div>} */}
            </div>
            <div className='order-modal-container'>
                <OrderModal modalClass="aside" gig={gig} />
            </div>

        </section>
    )
}



const mapStateToProps = state => {
    return {
        gig: state.gigModule.watchedGig
    }
}
const mapDispatchToProps = {
    loadGig
}

export const GigDetails = connect(mapStateToProps, mapDispatchToProps)(_GigDetails)