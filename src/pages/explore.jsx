import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'


import { loadGigs, addGig, updateGig, removeGig, addToCart } from '../store/gig.actions.js'

import { showSuccessMsg } from '../services/event-bus.service.js'
import { gigService } from '../services/gig.service.js'
import { GigList } from '../cmps/gig-list.jsx'

export const Explore = (props) => {

    const { gigs } = useSelector(state => state.gigModule)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(loadGigs())
    }, [])

    const onRemoveGig = (gigId) => {
        dispatch(removeGig(gigId))
    }
    const onAddGig = () => {
        const gig = gigService.getEmptyGig()
        gig.title = prompt('title?')
        dispatch(addGig(gig))
    }
    const onUpdateGig = (gig) => {
        const price = +prompt('New price?')
        const gigToSave = { ...gig, price }
        dispatch(updateGig(gigToSave))
    }

    const onAddToCart = (gig) => {
        console.log(`Adding ${gig.title} to Cart`)
        dispatch(addToCart(gig))
        showSuccessMsg('Added to Cart')
    }

    return (
        <div>
            <h3>Most popular Gigs in</h3>
            <main>
                <button onClick={onAddGig}>Add Gig</button>
                <GigList
                    gigs={gigs}
                    onRemoveGig={onRemoveGig}
                    onUpdateGig={onUpdateGig}
                    onAddToCart={onAddToCart}
                    history={props.history}
                     />

            </main>
        </div>
    )
}
