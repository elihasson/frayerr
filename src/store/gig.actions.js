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
    return async (dispatch, getState) => {
        const filterBy = getState().gigModule.filterBy
        try {
            dispatch({ type: 'LOADING_START' })
            const gigs = await gigService.query(filterBy)
            console.log('gigs from DB:', gigs)
            dispatch({
                type: 'SET_GIGS',
                gigs
            })

        } catch (err) {
            showErrorMsg('Cannot load gigs')
            console.log('Cannot load gigs', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function loadFeatures(categoryName) {
    return async (dispatch) => {
        try {
            const gig = await gigService.getFeaturesByCategory(categoryName)
            dispatch({ type: 'SET_GIG_FEATURES', gig })
        } catch (err) {
            showErrorMsg('Cannot load Features')
            console.log('Cannot load Features', err)
        }
    }
}


export function loadCategories() {
    return async (dispatch) => {
        try {
            const categories = await gigService.getCategories()
            console.log('Categories from DB:', categories)
            dispatch({
                type: 'SET_CATEGORIES',
                categories
            })

        } catch (err) {
            showErrorMsg('Cannot load Categories')
            console.log('Cannot load Categories', err)
        }
    }
}

export function removeGig(gigId) {
    return async (dispatch) => {
        try {
            await gigService.remove(gigId)
            console.log('Deleted Succesfully!')
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

export function setLikedGig(gig, user) {
    return async (dispatch) => {
        try {
            const savedGig = await gigService.toggleLike(gig._id, user)
            console.log('Updated Gig:', savedGig);
            dispatch(getActionUpdateGig(savedGig))
        } catch (err){
            console.log('err', err)
        }
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

export function loadGig(gigId) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'LOADING_START' })
            const gig = await gigService.getById(gigId)
            dispatch({ type: 'SET_WATCHED_GIG', gig })
        } catch (err) {
            showErrorMsg('Cannot load gig')
            console.log('Cannot load gig', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
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

export function setFilterTxt(txt) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_TXT', txt })
    }
}

export function setFilterUserId(userId) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_USER_ID', userId })
    }
}

export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}

export function clearFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'CLEAR_FILTER_BY'})
    }
}

export function setSortBy(sortBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_SORT_BY', sortBy })
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

