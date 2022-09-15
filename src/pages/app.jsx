import React, { useEffect } from 'react'
import { connect } from 'react-redux'


import { loadGigs, addGig, updateGig, removeGig, addToCart } from '../store/gig.actions.js'

import { showSuccessMsg } from '../services/event-bus.service.js'
import { gigService } from '../services/gig.service.js'
import { GigPreview } from '../cmps/gig-preview.jsx'

function _App({ loadGigs, addGig, updateGig, removeGig, addToCart, gigs }) {

    useEffect(() => {
        loadGigs()
    }, [])

    const onRemoveGig = (gigId) => {
        removeGig(gigId)
    }
    const onAddGig = () => {
        const gig = gigService.getEmptyGig()
        gig.title = prompt('title?')
        addGig(gig)
    }
    const onUpdateGig = (gig) => {
        const price = +prompt('New price?')
        const gigToSave = { ...gig, price }
        updateGig(gigToSave)
    }

    const onAddToCart = (gig) => {
        console.log(`Adding ${gig.title} to Cart`)
        addToCart(gig)
        showSuccessMsg('Added to Cart')
    }

    return (
        <div>
            <h3>Gigs App</h3>
            <main>
                <button onClick={onAddGig}>Add Gig ⛐</button>
                <ul className="gig-list">
                    {gigs.map(gig => <GigPreview key={gig._id} gig={gig}
                        onRemoveGig={onRemoveGig}
                        onUpdateGig={onUpdateGig}
                        onAddToCart={onAddToCart} />)}
                </ul>
            </main>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        gigs: state.gigModule.gigs
    }
}
const mapDispatchToProps = {
    loadGigs,
    removeGig,
    addGig,
    updateGig,
    addToCart
}


export const App = connect(mapStateToProps, mapDispatchToProps)(_App)