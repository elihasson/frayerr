// import ViewAll from '../assets/images/view_all.svg'
import { ReactComponent as ViewAll } from '../assets/images/view_all.svg'
import { ReactComponent as Illustration } from '../assets/images/illustration.svg'
import { ReactComponent as LogoDesign } from '../assets/images/logo_design.svg'
import { ReactComponent as VoiceOver } from '../assets/images/voice_over.svg'
import { ReactComponent as Wordpress } from '../assets/images/wordpress.svg'
import { ReactComponent as VideoExplainer } from '../assets/images/video_explainer.svg'
import { ReactComponent as Programming } from '../assets/images/programming.svg'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loadGigs, addGig, updateGig, removeGig, loadCategories, setFilterBy } from '../store/gig.actions.js'
import FormControl from '@mui/material/FormControl'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import { showSuccessMsg } from '../services/event-bus.service.js'
import { gigService } from '../services/gig.service.js'
import { GigList } from '../cmps/gig-list.jsx'

export const Explore = (props) => {

    const gigs = useSelector(state => state.gigModule.gigs)
    const user = useSelector(state => state.userModule.user)
    const filterBy = useSelector(state => state.gigModule.filterBy)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isBudgetOpen, setIsBudgetOpen] = useState(false)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(10000000)
    const [currCategory, setCurrCategory] = useState('')

    useEffect(() => {
        dispatch(loadGigs())
        //    gigs = loadGigs()
    }, [filterBy])

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

    const handleFilter = ({ target }) => {
        const field = target.name
        const value = target.value
        dispatch(setFilterBy({ [field]: value }, field))
        navigate(`/explore?${filterBy}`)
    }

    // const handleBudget = ({ target }) => {
    const handleBudget = ({ target }) => {
        const field = target.name
        const value = +target.value
        
        if (field === "minPrice" && filterBy.maxPrice === '' ) filterBy.maxPrice =  9999999

        dispatch(setFilterBy({ ...filterBy, [field]: value }, field))
    }

    const handleCategory = (catName) => {
        setCurrCategory(catName)
        dispatch(setFilterBy({category: catName }))
        dispatch(setFilterBy({ ...filterBy, category: catName }, 'category'))
    }

    const clearFilter = () => {
        
        dispatch(setFilterBy({ ...filterBy, minPrice: '', maxPrice: '' }))
        // dispatch(setFilterBy({}))
    }

    const applyFilter = () => {
        navigate(`/explore?${filterBy}`)
    }


    const toggleBudget = () => {
        setIsBudgetOpen(!isBudgetOpen)

    }


    // add to favorites ?
    // const onAddToCart = (gig) => {
    //     console.log(`Adding ${gig.title} to Cart`)
    //     dispatch(addToCart(gig))
    //     showSuccessMsg('Added to Cart')
    // }

    var budgetClass = isBudgetOpen ? "open" : ""
    const gigsTitle = !currCategory ? "All Categories" : currCategory
    const noUserClass = !user ? "no-user" : ''

    return (
        <div className={`explore ${noUserClass}`}>
            <h2>{gigsTitle}</h2>
            <div className="category-selection-container">
                <ul className="categories-grid">
                    <li  onClick={() => handleCategory('')} className="category-card all flex">
                        <div><ViewAll className='cat-svg-icon'/></div>
                        <p>All</p>
                    </li>
                    <li onClick={() => handleCategory('illustration')} value='illustration' className="category-card illustration flex">
                    {/* <li  className="category-card illustration flex"> */}
                        <div><Illustration className='cat-svg-icon'/></div>
                        <p>Illustration</p>
                    </li>
                    <li onClick={() => handleCategory('logo design')} value='logo-design' className="category-card logo-design flex">
                    {/* <li  className="category-card logo-design flex"> */}
                        <div><LogoDesign className='cat-svg-icon'/></div>
                        <p>Logo Design</p>
                    </li>
                    <li onClick={() => handleCategory('voice over')} value='voice-over' className="category-card voice-over flex">
                    {/* <li  className="category-card voice-over flex"> */}
                        <div><VoiceOver className='cat-svg-icon'/></div>
                        <p>Voice Over</p>
                    </li>
                    <li onClick={() => handleCategory('wordpress')} value='wordpress' className="category-card wordpress flex">
                    {/* <li className="category-card wordpress flex"> */}
                        <div><Wordpress className='cat-svg-icon'/></div>
                        <p>Wordpress</p>
                    </li>
                    <li onClick={() => handleCategory('video explainer')} value='video-explainer' className="category-card video-explainer flex">
                    {/* <li className="category-card video-explainer flex"> */}
                        <div><VideoExplainer className='cat-svg-icon'/></div>
                        <p>Video Explainer</p>
                    </li>
                    <li onClick={() => handleCategory('programming')} value='programming' className="category-card programming flex">
                    {/* <li className="category-card programming flex"> */}
                        <div><Programming className='cat-svg-icon'/></div>
                        <p>Programming</p>
                    </li>
                </ul>
            </div>
            <div className="filter-container">
                <FormControl sx={{ minWidth: 120, margin: 0 }}>
                    <ThemeProvider theme={theme}>
                        <div className={`filters-div flex`}>
                            <Select
                                value={filterBy.deliveryTime}
                                name='deliveryTime'
                                onChange={handleFilter}
                                displayEmpty
                                className='delivery select'
                                inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value='' className="select-item">
                                    <em>Delivery Time</em>
                                </MenuItem>
                                <MenuItem className="select-item" value={1}>Express 24H</MenuItem>
                                <MenuItem className="select-item" value={3}>Up to 3 days</MenuItem>
                                <MenuItem className="select-item" value={7}>Up to 7 days</MenuItem>
                            </Select>
                            <div className="budget-div">
                                <div onClick={() => toggleBudget()} className="budget-select">
                                    <span className="text">Budget</span>  <span className={`arrow ${budgetClass}`}><ArrowDropDownIcon /></span>
                                </div>
                                <div className={`budget-content ${budgetClass}`}>
                                    <div className="budget-filter">
                                        <div className="price-filter flex">
                                            <div className="input-wrapper flex column">
                                                <label htmlFor="min">Min:
                                                </label>
                                                <input type="text" name="minPrice" onChange={handleBudget} placeholder="Any" value={filterBy.minPrice} />
                                            </div>
                                            <div className="input-wrapper flex column">
                                                <label htmlFor="maxPrice">Max.
                                                </label>
                                                <input type="text" name="maxPrice" onChange={handleBudget} placeholder="Any" value={filterBy.maxPrice} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="budget-btns flex">
                                        <button className="close-btn" onClick={clearFilter}>clear</button>
                                        <button className="btn" onClick={applyFilter}>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </FormControl>
            </div>
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

const theme = createTheme({
    components: {
        MuiSelect: {
            styleOverrides: {
                select: {
                    padding: ('8px 15px'),
                    borderRadius: '0px',
                },
            },
        },
    },
});
