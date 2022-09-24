import { SearchBar } from './search-bar'
import { HeroDetails } from './hero-details'
import { useState, useEffect } from 'react'
// import { img } from '../assets/img/bg-hero-1.jpg'

export const AppHero = () => {
    let heroIdx = 0

    const heros = [
        {
            imgSrc: '1.jpg',
            bgc: '#023a15',
            details: {
                heroName: 'Andrea',
                heroRole: 'Fashion Designer'
            }
        },
        {
            imgSrc: '2.jpg',
            bgc: '#b64762',
            details: {
                heroName: 'Moon',
                heroRole: 'Marketing Expert'
            }
        },
        {
            imgSrc: '3.jpg',
            bgc: '#540e1f',
            details: {
                heroName: 'Ritika',
                heroRole: 'Shoemaker and Designer'
            }
        },
        {
            imgSrc: '4.jpg',
            bgc: '#023a15',
            details: {
                heroName: 'Zach',
                heroRole: 'Bar Owner'
            }
        },
        {
            imgSrc: '5.jpg',
            bgc: '#7d1a00',
            details: {
                heroName: 'Gabrielle',
                heroRole: 'Video Editor'
            }
        }
    ]

    const [hero, setHero] = useState(heros[0])

    useEffect(() => {
        const intervalId = setInterval(() => {
            heroIdx = (heroIdx + 1) % heros.length
            // console.log('heroIdx:', heroIdx)
            setHero(heros[heroIdx])
        }, 7000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        // this url works in backgroundImage: "https://via.placeholder.com/500"
        // this url doesn't: ${hero.imgSrc}
        // this url also finally works `../assets/img/bg-hero-${hero.imgSrc}`
        // rendering background images doesn't affect breakpoints which is good
        <div className='hero-container'>
            <div className='hero-background'>
                <div className='hero' style={{backgroundImage: `url(${require(`../assets/img/bg-hero-${hero.imgSrc}`)})`, backgroundColor: hero.bgc}}>
                    <div className='hero-header add-main-layout'>
                        <h1 className='hero-title'>
                            Find the perfect <i>freelance</i> services for your business
                        </h1>
                        <SearchBar />
                    </div>
                    <HeroDetails heroDetails={hero.details}/>
                </div>
            </div>
        </div>
    )
}