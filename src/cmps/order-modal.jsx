import React, { useState, useEffect } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckIcon from '@mui/icons-material/Check'
import { Link } from 'react-router-dom'
import { loadCategories } from '../store/gig.actions'

import { useDispatch, useSelector } from 'react-redux'


export const OrderModal = ({ gig, modalClass}) => {

    var { title } = gig // todo change the name of title
    const categories = useSelector(state => state.gigModule.categories)
    const [features, setFeatures] = useState([])
    console.log('categories:', categories)
    console.log('gig:', gig)

    useEffect(() => {
        title = _dropIWill(title)
        _getFeaturesByCategory(gig.category)
    })

    const _dropIWill = (title) => {
        title = title.trim()
        var titleToEdit = title.toLowerCase()
        if (titleToEdit.startsWith('i will')) {
            title = title.slice(7)
            title = title.charAt(0).toUpperCase() + title.slice(1)
        }
        return title
    }

    const _getFeaturesByCategory = (categoryName) => {
        const featuresObj = categories.filter(category => category.title === categoryName)
        setFeatures(featuresObj[0]?.features)
        console.log('featuresObj.features:',featuresObj )
    }

    if (!gig) return <div>Loading...</div>
    return (
        <div className={`order-modal ${modalClass}`}>
            <div className="order-title-wrapper">
                <h3 className="order-title">{title}</h3>
                <span className="order-price">{gig.price.toLocaleString('USA', { style: 'currency', currency: 'USD' })}</span>
            </div>
            <p className="order-subtitle">{gig.title}</p>
            <div className="order-delivery">
                <AccessTimeIcon className="clock-icon" />
                {gig.daysToMake} Days Delivery
            </div>
            <div className="order-features">
                <ul className="clean-list">
                    {features?.map((feature, idx) => {
                        return (<li key={idx}>
                            <CheckIcon className="check-icon" />
                            {feature}
                        </li>)
                    })}
                </ul>
            </div>
            {/* <Link className="clean-link" to={`/checkout/${gig._id}?features=${features}`}> */}
            <Link className="clean-link" to={`/checkout/${gig._id}`}>
                <button className="btn">Continue ({gig.price.toLocaleString('USA', { style: 'currency', currency: 'USD' })})</button>
            </Link>
            {/* <Link className="clean-link" to={`/explore/${gig._id}`}>
                <p className="gig-title"> {getShortTitle(gig.title)} </p>
            </Link> */}
        </div>
    )
}