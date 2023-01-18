import { useEffect, useState } from 'react'
import { useSelector, useDispatch  } from 'react-redux'

import { AppHero } from '../cmps/app-hero'
import { HomeTrustedBy } from '../cmps/home-trusted-by'
import { HomeCategory } from '../cmps/home-category'
import { HomePageInfo } from '../cmps/home-page-info'
import { HomeSignup } from '../cmps/home-signup'

import { setHomePage } from '../store/system.actions.js' 

export const HomePage = () => {

    const isHome = useSelector(state => state.systemModule.user) 
    const dispatch = useDispatch() 

    useEffect(() => {  
        dispatch(setHomePage(true))

        return () => {
            dispatch(setHomePage(false))
        }
    }, [])

    return (
        <section className="home-container full">
            <div className="home-page main-layout">
                <AppHero />
                <HomeTrustedBy />
                <HomeCategory />
                <HomePageInfo />
                <HomeSignup />
            </div>
        </section >
    )
}