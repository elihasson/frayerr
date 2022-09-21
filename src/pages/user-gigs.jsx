import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadUser } from '../store/user.actions'
import { updateGig, removeGig } from '../store/gig.actions'
import { UserGigList } from '../cmps/user-gig-list'

export const UserGigs = () => {
    const { user } = useSelector(state => state.userModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    }, [])

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
                gigs = {user.gigs}
                onRemoveGig={onRemoveGig}
                onUpdateGig={onUpdateGig}
            />
        </div>
    )

}