import logo from '../assets/img/hero-portrait_1.png'

export const AppHero = () => {
    return (
        <div className='hero-container debug'>
            <div className='hero-imgs-container debug'>
                <div className='hero-img-container flex debug'>
                    <img src={logo} alt='Hero' className='hero-img debug' />
                </div>
            </div>
            <div className='hero-content-container flex max-width-container debug'>
                <div className='hero-content debug'>
                    <h1>
                        Find the perfect <i>freelance</i> services for your business
                    </h1>
                </div>
                {/* <div className="static-background"></div> */}
                <div className='seller-name debug'>
                    <span className='seller-skill'>Andrea, </span>
                    <span className='seller-skill'>Web Designer</span>
                </div>
            </div>
        </div>
    )
}