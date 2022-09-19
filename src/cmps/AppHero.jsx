// import logo from '../assets/img/hero-portrait_1.png'
import { SearchBar } from './search-bar'
import { HeroDetails } from './hero-details'

export const AppHero = () => {

    const changeImg = () => {
        return 'andrea'
    }

    return (
        // <div className='hero-container debug'>
        //     <div className='hero-imgs-container debug'>
        //         <div className='hero-img-container flex debug'>
        //             <img src={logo} alt='Hero' className='hero-img debug' />
        //         </div>
        //     </div>
        //     <div className='hero-content-container flex max-width-container debug'>
        //         <div className='hero-content debug'>
        //             <h1>
        //                 Find the perfect <i>freelance</i> services for your business
        //             </h1>
        //         </div>
        //         {/* <div className="static-background"></div> */}
        //         <div className='seller-name debug'>
        //             <span className='seller-skill'>Andrea, </span>
        //             <span className='seller-skill'>Web Designer</span>
        //         </div>
        //     </div>
        // </div>
        <div className='hero-container '>
            <div className={`${changeImg()}-hero-background`}>
                <div className="hero">
                    <div className='hero-header add-main-layout '>
                        <h1 className="hero-title ">
                            Find the perfect <i>freelance</i> services for your business
                        </h1>
                        <SearchBar />
                    </div>
                    <HeroDetails heroDetails={changeImg()}/>
                </div>
            </div>
        </div>
    )
}