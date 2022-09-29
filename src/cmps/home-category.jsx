import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { gigService } from '../services/gig.service'
import { setFilterBy, loadGigs, loadCategories } from '../store/gig.actions'

export const HomeCategory = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const gigs = useSelector(state => state.gigModule.gigs)
    const categories = useSelector(state => state.gigModule.categories)
    const filterBy = useSelector(state => state.gigModule.filterBy)

    const [currCategory, setCurrCategory] = useState('')
    // const [popularCategories, setPopularCategories] = useState([])

    // useEffect(() => {
    //     dispatch(setFilterBy(''))
    //     dispatch(loadGigs())

    //     return dispatch(setFilterUserId(''))
    // }, [])

    // useEffect(() => {
    //     dispatch(setFilterBy(''))
    //     dispatch(categories())

    //     return dispatch(setFilterUserId(''))
    // }, [])

    // useEffect(() => async () => {
    //     var ans = await getPopularCategories()
    //     setPopularCategories(ans)
    // }, [])

    // const getPopularCategories = async () => {
    //     return await gigService.getPopularCategories(6)
    //     // const popularCategories = await gigService.getPopularCategories(6)
    //     // console.log('popularCategories:', popularCategories)
    //     // return popularCategories
    // }

    // useEffect(() => {
    //     dispatch(loadCategories())
    // }, [])

    const handleCategory = (catName) => {
        setCurrCategory(catName)
        dispatch(setFilterBy({category: catName }))
        dispatch(setFilterBy({ ...filterBy, category: catName }, 'category'))
    }

    const onSetFilter = (category) => {
       handleCategory(category)
       navigate(`/explore`)
        // dispatch(setFilterBy({category:category}))
        // dispatch(loadGigs())
        // props.history.push(`/explore?category=${category}`)
        // navigate(`/explore?${category}`)
    }

    return (
        <section className='proffesional-services-container max-width-container'>
            <h1>Popular professional services</h1>
            <div className='proffesional-services'>
                <div className='img-container' onClick={() => {
                    onSetFilter(categories[0]?.name)
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">
                        <div className="subtitle"> Engage your audience</div>
                        <div className="title">{categories[0]?.name}</div>
                    </div>
                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png" />
                </div>
                {/* <div className='img-container' onClick={() => {
                    onSetFilter(categories[1]?.name)
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">
                        <div className="subtitle">Color your dreams</div>
                        <div className="title">{categories[1]?.name}</div>
                    </div>

                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png" />
                </div> */}
                <div className='img-container' onClick={() => {
                    onSetFilter(categories[2]?.name)
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">

                        <div className="subtitle">Share your message</div>
                        <div className="title">{categories[2]?.name}</div>
                    </div>

                    <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/social-media_ihqmul.jpg" />
                </div>
                <div className='img-container' onClick={() => {
                    onSetFilter(categories[3]?.name)
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">

                        <div className="subtitle">
                            Build your brand
                        </div>
                        <div className="title">{categories[3]?.name}</div>
                    </div>

                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png" />
                </div>
                <div className='img-container' onClick={() => {
                    onSetFilter(categories[4]?.name)
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">

                        <div className="subtitle">
                            Customize your site
                        </div>
                        <div className="title">{categories[4]?.name}</div>
                    </div>

                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png" />
                </div>
                <div className='img-container' onClick={() => {
                    onSetFilter(categories[5]?.name)
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">

                        <div className="subtitle">
                            Share your message
                        </div>
                        <div className="title">{categories[5]?.name}</div>
                    </div>

                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png" />
                </div>
            </div>
        </section >
    )
}