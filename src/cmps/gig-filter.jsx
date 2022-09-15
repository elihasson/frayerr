import React, { useState, useEffect } from 'react'

import SearchIcon from '@mui/icons-material/Search';

export const GigFilter = () => {

    const [txt, setTxt] = useState('');
    
    const handleChange = ({ target }) => {
        const { value } = target
        setTxt(value);
    }
    
    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log('onSubmit filter line12 gig-filter:', txt );
    }
    return (
            <form className='search-bar-container'
                onSubmit={onSubmit}>
                <input
                    className='search-bar'
                    type="search"
                    placeholder="Find services"
                    autoComplete='off'
                    value={txt}
                    name='txt'
                    onChange={handleChange}
                />
                <button className='search-button'><SearchIcon /></button>
            </form>
    )
}