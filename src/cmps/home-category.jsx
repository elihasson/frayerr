import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { gigService } from '../services/gig.service'
import { setFilterBy, loadGigs, loadCategories } from '../store/gig.actions'

import { ProfessionalServices } from './professional-services'

export const HomeCategory = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const categories = useSelector(state => state.gigModule.categories)
    const filterBy = useSelector(state => state.gigModule.filterBy)

    const handleCategory = (categoryName) => {
        dispatch(setFilterBy({ category: categoryName }))
        dispatch(setFilterBy({ ...filterBy, category: categoryName }, 'category'))
    }

    const onSetFilter = (category) => {
        handleCategory(category)
        navigate(`/explore`)
    }

    return (
        <section className="professional-services-container max-width-container">
            <h1>Popular professional services</h1>
            <ProfessionalServices categories={categories} onSetFilter={onSetFilter}/>
        </section >
    )
}