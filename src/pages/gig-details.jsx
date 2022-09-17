import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadGig } from '../store/gig.actions'
import { CarouselItem } from '../cmps/carousel-item'
import { Carousel } from '../cmps/Carousel'

export function _GigDetails({ gig, loadGig }) {

    const params = useParams()

    useEffect(() => {
        // debugger
        // console.log(params)
        loadGig(params.gigId)
    }, [])

    if (!gig) return <div>Loading...</div>
    return (
        <section className="gig-details">
            <div className='details-header inpage-nav' id='Overview'>
                <h1 className="gig-title">{gig.title}</h1>
                <div className="owner-info">
                    <h5 className='owner-image'>image</h5>
                    {/* {gig.owner.imgUrl} */}
                    <h5 className='owner-name'>{gig.owner.fullname}</h5>
                    <h5 className='owner-level'>{gig.owner.rate}</h5>
                    <span className='spacer'>|</span>
                    <h5>stars</h5>
                </div>
            </div>

            <div className="gig-img">
                <Carousel gig={gig}>
                    {gig.imgUrls[0] && gig.imgUrls.map((imgUrl, idx) => <CarouselItem key={idx} imgUrl={imgUrl} isDetails={true}></CarouselItem>)}
                </Carousel>
            </div>


            <h1>Gig Details</h1>
            {gig && <div>
                <h3>
                    {gig.title}
                </h3>
                <pre>
                    {JSON.stringify(gig, null, 2)}
                </pre>
            </div>}
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