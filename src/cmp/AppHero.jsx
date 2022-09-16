import logo from '../assets/img/bg-hero-1.jpg'

export const AppHero = () => {
    return (
        <div className="hero-container debug">
            <img src={logo} alt="Hero" className='hero-img' />
            <div className='hero-content debug'>
                <h1>
                    Find the perfect <i>freelance</i> services for your business
                </h1>
            </div>
        </div>
    )
}