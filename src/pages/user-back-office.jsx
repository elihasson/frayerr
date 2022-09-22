import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const UserBackOffice = (props) => {
    const navigate = useNavigate()


    const user = useSelector(state => state.userModule.user)

    return (
        <section className='back-office-container'>
            <button className="btn" onClick={() => navigate(`/edit`)}>create gig</button>
            <button className="btn" onClick={() => navigate(`/user/${user._id}/order`)}>Show orders</button>
        </section>
    )
}