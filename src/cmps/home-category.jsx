import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { gigService } from '../services/gig.service'
import { onSetFilterBy, loadGigs } from '../store/gig.actions'

export const HomeCategory = (props) => {
    const gigs = useSelector(state => state.gigModule.gigs)
    const filterBy = useSelector(state => state.gigModule.filterBy)

    const [popularCategories, setCategories] = useState([])
    useEffect(async () => {
        var ans = await getCategories()
        setCategories(ans)
        return () => {
        }
    }, [])

    const getCategories = async () => {
        return await gigService.getPopularCategories(5)
    }

    const onSetFilter = (category) => {
        props.loadGigs({ category })
        props.onSetFilterBy({ category }, 'category')
        props.history.push(`/explore?category=${category}`)
        // useNavigate(`/explore?category=${category}`)
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
                    <div className="subtitle"> Capture your audience</div>
                    <div className="title">{popularCategories[0]}</div>
                </div>
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/video-explainer_gjzhjs.jpg" />
            </div>
            <div className='img-container' onClick={() => {
                onSetFilter(popularCategories[1])
            }}>
                <span className="on-click"></span>
                <div className="category-container">
                    <div className="subtitle">Color your dreams</div>
                    <div className="title">{popularCategories[1]}</div>
                </div>
                
                <img src="https://res.cloudinary.com/ben2423/image/upload/v1643373743/old-fashioned-steam-train-crossing-the-mountain-bridge-vector-id165959348_oo3saj.jpg" />
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

                    <div className="subtitle">
                    Brand your business
                        </div>
                    <div className="title">{popularCategories[3]}</div>
                </div>
                
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781888/logo-starbucks_w8plcz.jpg" />
            </div>
            <div className='img-container' onClick={() => {
                onSetFilter(popularCategories[4])
            }}>
                <span className="on-click"></span>
                <div className="category-container">

                    <div className="subtitle">
                    Level up your site
                        </div>
                    <div className="title">{popularCategories[4]}</div>
                </div>
                
                <img src="https://res.cloudinary.com/drdfrwt1d/image/upload/v1642781889/wordpress_dofxal.jpg" />
            </div>
        </div>
    </section >
    )
}