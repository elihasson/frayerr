import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadGigs, updateGig, removeGig } from '../store/gig.actions'
import { UserGigList } from '../cmps/user-gig-list'

export const UserGigs = () => {
    const { user } = useSelector(state => state.userModule)
    const  gigs  = useSelector(state => state.gigModule.gigs)
    const dispatch = useDispatch()

    const onRemoveGig = (gigId) => {
        dispatch(removeGig(gigId))
    }

    const onUpdateGig = (gig) => {
        const price = +prompt('New price?')
        const gigToSave = { ...gig, price }
        dispatch(updateGig(gigToSave))
    }

    return (
        <div>
            <UserGigList
                user={user}
                gigs={gigs}
                onRemoveGig={onRemoveGig}
                onUpdateGig={onUpdateGig}
            />
        </div>
    )

}