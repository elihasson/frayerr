import { SearchBar } from './search-bar'
import { HeroPopularServices } from './hero-popular-services'
import { HeroDetails } from './hero-details'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFilterBy} from '../store/gig.actions'

export const AppHero = () => {
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

    const heroIdx = useRef(0)

    const heros = [
        {
            imgSrcs: ['1-v1.jpg', '1-v2.jpg'],
            bgc: '#023a15',
            details: {
                heroName: 'Andrea',
                heroRole: 'Fashion Designer'
            }
        },
        {
            imgSrcs: ['2-v1.jpg', '2-v2.jpg'],
            bgc: '#b64762',
            details: {
                heroName: 'Moon',
                heroRole: 'Marketing Expert'
            }
        },
        {
            imgSrcs: ['3-v1.jpg', '3-v2.jpg'],
            bgc: '#540e1f',
            details: {
                heroName: 'Ritika',
                heroRole: 'Shoemaker and Designer'
            }
        },
        {
            imgSrcs: ['4-v1.jpg', '4-v2.jpg'],
            bgc: '#023a15',
            details: {
                heroName: 'Zach',
                heroRole: 'Bar Owner'
            }
        },
        {
            imgSrcs: ['5-v1.jpg', '5-v2.jpg'],
            bgc: '#7d1a00',
            details: {
                heroName: 'Gabrielle',
                heroRole: 'Video Editor'
            }
        }
    ]

    const [hero, setHero] = useState(heros[heroIdx.current])
    const [windowCurrWidth, setWindowCurrWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleWidthResize = () => {
            setWindowCurrWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleWidthResize)

        const intervalId = setInterval(() => {
            heroIdx.current = (heroIdx.current + 1) % heros.length
            setHero(heros[heroIdx.current])
        }, 7000)
        return () => {
            window.removeEventListener('resize', handleWidthResize)
            clearInterval(intervalId)
        }
    })

    return (
        <div className="hero-container full">
            <div className="hero-background">
                <div className="hero" style={{ backgroundImage: `url(${require(`../assets/img/bg-hero-${hero.imgSrcs[`${windowCurrWidth > 1159 ? 0 : 1}`]}`)})`, backgroundColor: hero.bgc }}>
                    <div className="hero-header add-main-layout">
                        <h1 className="hero-title">
                            Find the perfect <i>freelance</i> services for your business
                        </h1>
                        <SearchBar />
                        <HeroPopularServices categories={categories} onSetFilter={onSetFilter} />
                    </div>
                </div>
            </div>
            <HeroDetails heroDetails={hero.details} />
        </div>
    )
}