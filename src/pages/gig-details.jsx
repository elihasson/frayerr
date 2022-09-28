import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import { CarouselItem } from '../cmps/carousel-item'
import { Carousel } from '../cmps/carousel'
import { OrderModal } from '../cmps/order-modal'
import { UserRateStars } from '../cmps/user-rate-stars'
import {  loadGig } from '../store/gig.actions'
import { AboutSeller } from '../cmps/about-seller'


export const GigDetails = () => {

    const dispatch = useDispatch()
    const gig = useSelector(state => state.gigModule.watchedGig)
    console.log('gig:', gig)

    const params = useParams()
    //need to be inner function if no gig
    useEffect(() =>  {
        dispatch(loadGig(params.gigId))
    }, [params.gigId])
    
    //component of loader
    if (!gig) return <div>Loading...</div>

    let levelClass, levelDesc
    if (gig?.owner?.rate < 4) {
        levelClass = ''
        levelDesc = 'Level 2 Seller'
    } else {
        levelClass = 'top'
        levelDesc = 'Top Rated Seller'
    }

    return (
        <section className='gig-details-page flex column'>
            <section className="gig-details">
                <div className="gig-details-container">
                    <div className='details-header inpage-nav' id='Overview'>
                        <h1 className="gig-title">{gig.title}</h1>
                        <div className="owner-info">
                            <div className="user-img" style={{ backgroundImage: `url(${gig.owner.imgUrl})` }}></div>
                            <h5 className='owner-name'>{gig.owner.fullname}</h5>
                            <h5 className={'owner-level ' + `${levelClass}`}>{levelDesc}</h5>
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
            <div className='about-gig'>
                <h4>About This Gig</h4>
                <p>
                    {gig.description}
                </p>
            </div>
            <AboutSeller gig={gig} owner={gig.owner} />
        </section>
    )
}


