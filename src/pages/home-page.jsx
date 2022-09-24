import { useEffect, useState } from "react"
import { useSelector, useDispatch  } from 'react-redux'

import { AppHero } from '../cmps/app-hero'
import { HomeCategory } from '../cmps/home-category.jsx'

import { setHomePage } from '../store/system.actions.js' // aharon

export const HomePage = () => {

    const isHome = useSelector(state => state.systemModule.user) //aharon
    const dispatch = useDispatch() //aharon

    useEffect(() => {  //aharon
        dispatch(setHomePage(true))

        return () => {
            dispatch(setHomePage(false))
        }
    }, [])

    return (
        <section className='home-container full'>
            <div className='home-page'>
                <AppHero />
                <HomeCategory />
            </div>
        </section >
    )

}
