import { SearchBar } from './search-bar'
import { HeroDetails } from './hero-details'
import { useState, useEffect } from 'react'
// import { img } from '../assets/img/bg-hero-1.jpg'

export const AppHero = () => {
    let heroIdx = 0

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

    const [hero, setHero] = useState(heros[0])
    const [windowCurrWidth, setWindowCurrWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleWidthResize = () => {
            setWindowCurrWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleWidthResize)

        const intervalId = setInterval(() => {
            heroIdx = (heroIdx + 1) % heros.length
            // console.log('heroIdx:', heroIdx)
            setHero(heros[heroIdx])
        }, 7000)
        return () => {
            window.removeEventListener('resize', handleWidthResize)
            clearInterval(intervalId)
        }
    }, [])

    

    return (
        // this url works in backgroundImage: "https://via.placeholder.com/500"
        // this url doesn't: ${hero.imgSrc}
        // this url also finally works `../assets/img/bg-hero-${hero.imgSrc}`
        // rendering background images doesn't affect breakpoints which is good
        <div className='hero-container full'>
            <div className='hero-background'>
                <div className='hero' style={{ backgroundImage: `url(${require(`../assets/img/bg-hero-${hero.imgSrcs[`${windowCurrWidth>1159?0:1}`]}`)})`, backgroundColor: hero.bgc }}>
                    <div className='hero-header add-main-layout'>
                        {/* removed add-main-layout */}
                        <h1 className='hero-title'>
                            Find the perfect <i>freelance</i> services for your business
                        </h1>
                        <SearchBar />
                    </div>
                </div>
                <HeroDetails heroDetails={hero.details} />
            </div>
        </div>
    )
}