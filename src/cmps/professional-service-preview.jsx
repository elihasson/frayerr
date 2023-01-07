export const ProfessionalServicePreview = ({ category, onSetFilter }) => {
    return (
        <div className="img-container" onClick={() => {
            onSetFilter(category?.title)
        }}>
            <span className="on-click"></span>
            <div className="category-container">
                <h5 className="subtitle">{category?.subtitle}</h5>
                <h4 className="title">{category?.title}</h4>
            </div>
            <img src={category?.imgUrl} />
        </div>
    )
}