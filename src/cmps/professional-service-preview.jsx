export const ProfessionalServicePreview = ({ category, onSetFilter }) => {
    <div className='img-container' onClick={() => {
        onSetFilter(category?.title)
    }}>
        <span className="on-click"></span>
        <div className="category-container">
            <div className="subtitle">{category?.subtitle}</div>
            <div className="title">{category?.title}</div>
        </div>
        <img src={category?.imgUrl} />
    </div>
}