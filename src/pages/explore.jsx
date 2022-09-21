import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { loadGigs, addGig, updateGig, removeGig, addToCart } from '../store/gig.actions.js'

import { showSuccessMsg } from '../services/event-bus.service.js'
import { gigService } from '../services/gig.service.js'
import { GigList } from '../cmps/gig-list.jsx'

export const Explore = (props) => {

    const { gigs } = useSelector(state => state.gigModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadGigs())
    //    gigs = loadGigs()
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
        //gig edit
        const price = +prompt('New price?')
        const gigToSave = { ...gig, price }
        dispatch(updateGig(gigToSave))
    }

    // add to favorites ?
    // const onAddToCart = (gig) => {
    //     console.log(`Adding ${gig.title} to Cart`)
    //     dispatch(addToCart(gig))
    //     showSuccessMsg('Added to Cart')
    // }

    return (
        <div className="explore">
            <h2>Most popular Gigs in</h2>
            <main>
                {/* <button onClick={onAddGig}>Add Gig</button> */}
                <GigList
                    gigs={gigs}
                    onRemoveGig={onRemoveGig}
                    onUpdateGig={onUpdateGig}
                     />
            </main>
        </div>
    )
}
