import { ProfessionalServicePreview } from './professional-service-preview.jsx'

export const ProfessionalServices = ({categories, onSetFilter}) => {
    return (
        <div className='professional-services'>
            {categories.slice(10).map(category => <ProfessionalServicePreview category={category} onSetFilter={onSetFilter}/>)}
            {/* <div className='img-container' onClick={() => {
                    onSetFilter(categories[0]?.title)
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">
                        <div className="subtitle">{categories[0]?.subtitle}</div>
                        <div className="title">{categories[0]?.title}</div>
                    </div>
                    <img src={categories[0].imgUrl} />
                </div>
                <div className='img-container' onClick={() => {
                    onSetFilter(categories[1]?.title)
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">
                        <div className="subtitle">{categories[1]?.subtitle}</div>
                        <div className="title">{categories[1]?.title}</div>
                    </div>
                    <img src={categories[1].imgUrl} />

                </div>
                <div className='img-container' onClick={() => {
                    onSetFilter(categories[2]?.title)
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">

                        <div className="subtitle">{categories[2]?.subtitle}</div>
                        <div className="title">{categories[2]?.title}</div>
                    </div>

                    <img src={categories[2].imgUrl} />
                </div>
                <div className='img-container' onClick={() => {
                    onSetFilter(categories[3]?.title)
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">

                        <div className="subtitle">
                            {categories[3]?.subtitle}
                        </div>
                        <div className="title">{categories[3]?.title}</div>
                    </div>

                    <img src={categories[3].imgUrl} />
                </div>
                <div className='img-container' onClick={() => {
                    onSetFilter(categories[4]?.title)
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">

                        <div className="subtitle">
                            {categories[4]?.subtitle}
                        </div>
                        <div className="title">{categories[4]?.title}</div>
                    </div>

                    <img src={categories[4].imgUrl} />
                </div>
                <div className='img-container' onClick={() => {
                    onSetFilter(categories[5]?.title)
                }}>
                    <span className="on-click"></span>
                    <div className="category-container">

                        <div className="subtitle">
                            {categories[5]?.subtitle}
                        </div>
                        <div className="title">{categories[5]?.title}</div>
                    </div>

                    <img src={categories[5].imgUrl} />
                </div> */}
        </div>
    )
}