import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { gigService } from '../services/gig.service'
import { setFilterBy, loadGigs } from '../store/gig.actions'

export const HomeCategory = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const gigs = useSelector(state => state.gigModule.gigs)
    const filterBy = useSelector(state => state.gigModule.filterBy)

    const [popularCategories, setCategories] = useState([])
    useEffect(() => async () => {
        var ans = await gigService.getCategories()
        setCategories(ans)
    }
        , [])

    const getPopularCategories = async () => {
        const popularCategories = await gigService.getPopularCategories(6)
        console.log('popularCategories:', popularCategories)
        // return await gigService.getPopularCategories(5)
        return popularCategories
    }

    const onSetFilter = (category) => {
        dispatch(setFilterBy(category))
        dispatch(loadGigs())
        // props.history.push(`/explore?category=${category}`)
        navigate(`/explore`)
    }

    return (
        <section className='proffesional-services-container max-width-container main-layout'>
            <h1>Popular professional services</h1>
            <div className='proffesional-services'>
                <div className='img-container' onClick={() => {
                    onSetFilter(popularCategories[0])
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">
                        <div className="subtitle"> Engage your audience</div>
                        <div className="title">{popularCategories[0]}</div>
                    </div>
                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png" />
                </div>
                <div className='img-container' onClick={() => {
                    onSetFilter(popularCategories[1])
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">
                        <div className="subtitle">Color your dreams</div>
                        <div className="title">{popularCategories[1]}</div>
                    </div>

                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png" />
                </div>
                <div className='img-container' onClick={() => {
                    onSetFilter(popularCategories[2])
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">

                        <div className="subtitle">Share your message</div>
                        <div className="title">{popularCategories[2]}</div>
                    </div>

                    <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/social-media_ihqmul.jpg" />
                </div>
                <div className='img-container' onClick={() => {
                    onSetFilter(popularCategories[3])
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">

                        <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/social-media_ihqmul.jpg" />
                    </div>
                    <div className='img-container' onClick={() => {
                        onSetFilter(popularCategories[3])
                    }}>
                        <span className="on-click"></span>
                        <div className="category-container">

                            <div className="subtitle">
                                Build your brand
                            </div>
                            <div className="title">{popularCategories[3]}</div>
                        </div>

                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png" />
                    </div>
                    <div className='img-container' onClick={() => {
                        onSetFilter(popularCategories[4])
                    }}>
                        <span className="on-click"></span>
                        <div className="category-container">

                            <div className="subtitle">
                                Customize your site
                            </div>
                            <div className="title">{popularCategories[4]}</div>
                        </div>

                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png" />
                    </div>
                    <div className='img-container' onClick={() => {
                        onSetFilter(popularCategories[4])
                    }}>
                        <span className="on-click"></span>
                        <div className="category-container">

                            <div className="subtitle">
                                Share your message
                            </div>
                            <div className="title">{popularCategories[5]}</div>
                        </div>

                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png" />
                    </div>
                </div>
            </div>
        </section >
    )
}