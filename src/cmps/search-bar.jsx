import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {

    const [txt, setTxt] = useState('')

    const handleChange = ({ target }) => {
        const { value } = target
        setTxt(value)
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log('onSubmit filter line12 gig-filter:', txt);
    }

    return (
        <form className='gig-search-bar-container' onSubmit={onSubmit}>
            <span className='search-icon-container'>
                <SearchIcon />
            </span>
            <input
                className='gig-search-bar'
                type='search'
                value={txt}
                onChange={handleChange}
                placeholder='Try "building web app"'
                autoComplete='off'
            />
            <button className='gig-btn-search'>Search</button>
        </form>
    )
}