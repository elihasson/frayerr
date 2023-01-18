export const HeroDetails = ({heroDetails}) => {
    return (
        <div className="hero-details">{heroDetails.heroName},
            <span className="hero-role"> {heroDetails.heroRole}</span>
        </div>
    )
}