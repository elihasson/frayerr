import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';

import { setFiltertxt  } from '../store/gig.actions'

export const GigFilter = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [txt, setTxt] = useState('');
    
    const handleChange = ({ target }) => {
        const { value } = target
        setTxt(value);
    }
    
    
    const onSubmit = (ev) => {
        ev.preventDefault();
        dispatch(setFiltertxt(txt))
        navigate(`/explore?txt=${txt}`)
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