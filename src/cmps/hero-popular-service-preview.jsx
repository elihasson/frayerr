export const HeroPopularServicePreview = ({ category, onSetFilter }) => {
    return (
        <div className="hero-popular-service-preview">
            <button onClick={() => {onSetFilter(category.title)}}>{category.title}</button>
        </div>
    )
}