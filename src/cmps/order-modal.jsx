import React, { useState, useEffect }  from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom';

import { gigService } from '../services/gig.service'


export function OrderModal({ gig, modalClass }) {

    var { title } = gig
    title = _dropIWill(title)
    const [features, setFeatures] = useState([])

    // useEffect(async () => {
    //     var ans = await getFeatures()
    //     setFeatures(ans)
    //     return () => {
    //     }
    // }, [])
   
    useEffect(() => {
        async function getFeatures() {
            let res = await gigService.getFeaturesByCategory(gig.category)
            setFeatures(res)
          }
      
          getFeatures()
    }, [])

    // const getFeatures = async () => {
    //     return await gigService.getFeaturesByCategory(gig.category)
    // }

    return (
        <div className={`order-modal ${modalClass}`}>
            <div className='order-title-wrapper'>
                <h3 className='order-title'>{title}</h3>
                <span className='order-price'>{gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
            </div>
            <p className='order-subtitle'>{gig.title}</p>
            <div className='order-delivery'>
                <AccessTimeIcon className="clock-icon" />
                {gig.daysToMake} Days Delivery
            </div>
            <div className='order-features'>
                <ul className='clean-list'>
                    {features.map((feature, idx) => {
                        return (<li key={idx}>
                            <CheckIcon className="check-icon" />
                            {feature}
                        </li>)
                    })}
                </ul>
            </div>
            {/* <Link className='clean-link' to={`/checkout/${gig._id}?features=${features}`}> */}
            <Link className='clean-link' to={`/checkout/${gig._id}`}>
                <button className='btn'>Continue ({gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })})</button>
            </Link>
            {/* <Link className='clean-link' to={`/explore/${gig._id}`}>
                <p className='gig-title'> {getShortTitle(gig.title)} </p>
            </Link> */}
        </div>
    )
}

function _dropIWill(title) {
    title = title.trim();
    var titleToEdit = title.toLowerCase();
    if (titleToEdit.startsWith('i will')) {
        title = title.slice(7);
        title = title.charAt(0).toUpperCase() + title.slice(1);
    }
    return title;
}