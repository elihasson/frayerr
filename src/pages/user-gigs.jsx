import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateGig, removeGig } from '../store/gig.actions'
import { UserGigList } from '../cmps/user-gig-list'
import { useNavigate } from 'react-router-dom'

export const UserGigs = () => {

    const navigate = useNavigate()
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
            <section>
                <button className="btn" onClick={() => navigate(`/edit`)}>create gig</button>
            </section>
            <UserGigList
                onRemoveGig={onRemoveGig}
                onUpdateGig={onUpdateGig}
            />
        </div>
    )

}