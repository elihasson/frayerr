import { gigService } from "../services/gig.service.js";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

// Action Creators:
export function getActionRemoveGig(gigId) {
    return {
        type: 'REMOVE_GIG',
        gigId
    }
}
export function getActionAddGig(gig) {
    return {
        type: 'ADD_GIG',
        gig
    }
}
export function getActionUpdateGig(gig) {
    return {
        type: 'UPDATE_GIG',
        gig
    }
}

export function loadGigs() {
    return async (dispatch) => {
        try {
            const gigs = await gigService.query()
            console.log('gigs from DB:', gigs)
            dispatch({
                type: 'SET_GIGS',
                gigs
            })

        } catch (err) {
            showErrorMsg('Cannot load gigs')
            console.log('Cannot load gigs', err)
        }
    }
}

export function removeGig(gigId) {
    return async (dispatch) => {
        try {
            await gigService.remove(gigId)
            console.log('Deleted Succesfully!');
            dispatch(getActionRemoveGig(gigId))
            showSuccessMsg('Gig removed')
        } catch (err) {
            showErrorMsg('Cannot remove gig')
            console.log('Cannot remove gig', err)
        }
    }
}

export function addGig(gig) {
    return (dispatch) => {

        gigService.save(gig)
            .then(savedGig => {
                console.log('Added Gig', savedGig);
                dispatch(getActionAddGig(savedGig))
                showSuccessMsg('Gig added')
            })
            .catch(err => {
                showErrorMsg('Cannot add gig')
                console.log('Cannot add gig', err)
            })
    }
}

export function updateGig(gig) {
    return (dispatch) => {
        gigService.save(gig)
            .then(savedGig => {
                console.log('Updated Gig:', savedGig);
                dispatch(getActionUpdateGig(savedGig))
                showSuccessMsg('Gig updated')
            })
            .catch(err => {
                showErrorMsg('Cannot update gig')
                console.log('Cannot save gig', err)
            })
    }
}

export function addToCart(gig) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TO_CART',
            gig
        })
    }
}

export function removeFromCart(gigId) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            gigId
        })
    }
}

export function checkout() {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            const total = state.gigModule.cart.reduce((acc, gig) => acc + gig.price, 0)
            const score = await userService.changeScore(-total)
            dispatch({ type: 'SET_SCORE', score })
            dispatch({ type: 'CLEAR_CART' })
            showSuccessMsg('Charged you: $' + total.toLocaleString())
        } catch (err) {
            showErrorMsg('Cannot checkout, login first')
            console.log('GigActions: err in checkout', err)
        }
    }
}


// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveGigOptimistic(gigId) {

    return (dispatch, getState) => {

        dispatch({
            type: 'REMOVE_GIG',
            gigId
        })
        showSuccessMsg('Gig removed')

        gigService.remove(gigId)
            .then(() => {
                console.log('Server Reported - Deleted Succesfully');
            })
            .catch(err => {
                showErrorMsg('Cannot remove gig')
                console.log('Cannot load gigs', err)
                dispatch({
                    type: 'UNDO_REMOVE_GIG',
                })
            })
    }
}