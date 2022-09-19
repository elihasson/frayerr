export const HeroDetails = ({heroDetails}) => {
    // console.log('props from heroDetails:', props)
    console.log('heroDetails:', heroDetails)
    return (
        <div className='hero-details'>{heroDetails.heroName},
            <span className='hero-role'> {heroDetails.heroRole}</span>
        </div>
    )
}