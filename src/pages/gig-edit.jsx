import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { UserRateStars } from '../cmps/user-rate-stars'
import { useForm } from '../hooks/useForm'
import { gigService } from '../services/gig.service'
import { addGig, updateGig } from '../store/gig.actions'

export const GigEdit = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const  user  = useSelector(state => state.userModule.user)

    const [gig, handleChange, setGig] = useForm({
        title: '',
        price: '',
        daysToMake: '',
        description: ''
    })

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
        const gigId = params.gigId
        console.log('gigID', gigId);
        if (!gigId) return
        gigService
            .getById(gigId)
            .then((gig) => {
                console.log('giigi', gig);
                setGig(gig)
            })
            .catch((err) => {
                console.log('err:', err)
            })
    }, [])

    const onSaveGig = (ev) => {
        ev.preventDefault()
        if (gig._id) {
            dispatch(updateGig(gig))
                .then(() => {
                    navigate('/explore')
                })
        } else {
            dispatch(addGig(gig))
                .then(() => {
                    navigate('/explore')
                })
        }
    }

    return (
        <section className="gig-edit full-height">
            <div className="gig-edit-container">
                <div className='details-header inpage-nav' id='Overview'>
                    <div className="owner-info">
                        <div className="user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}></div>
                        <h5 className='owner-name'>{user.fullname}</h5>
                        <h5 className='owner-level'>{user.rate}</h5>
                        <span className='spacer'>|</span>
                        {/* <UserRateStars gig={gig} /> */}
                        <h5>stars</h5>
                    </div>
                </div>

                <h1>{gig._id ? 'Edit' : 'Add'} Gig</h1>
                {/* <form onSubmit={onSaveGig}> */}
                <form onSubmit={onSaveGig}>
                    <label htmlFor="title">Title</label>
                    <input
                        ref={inputRef}
                        value={gig.title}
                        onChange={handleChange}
                        type="text"
                        name="title"
                        id="title"
                    />

                    <label htmlFor="price">Price</label>
                    <input
                        value={gig.price}
                        onChange={handleChange}
                        type="number"
                        name="price"
                        id="price"
                    />
                    <label htmlFor="daysToMake">days to make:</label>
                    <input
                        value={gig.daysToMake}
                        onChange={handleChange}
                        type="number"
                        name="daysToMake"
                        id="daysToMake"
                    />
                    <label htmlFor="description">description:</label>
                    <input
                        value={gig.description}
                        onChange={handleChange}
                        type="text"
                        name="description"
                        id="description"
                    />

                    <button>Save</button>
                </form>
            </div>

        </section>
    )
}




















// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { connect, useDispatch, useSelector } from 'react-redux'
// import { loadGig } from '../store/gig.actions'







// export const GigEdit = () => {
//     return(
//         <div>edit create</div>
//     )
// }