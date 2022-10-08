import { ProfessionalServicePreview } from './professional-service-preview.jsx'

export const ProfessionalServices = ({categories, onSetFilter}) => {
    return (
        <div className="professional-services">
            {categories.slice(0, 5).map(category => <ProfessionalServicePreview key={category.title} category={category} onSetFilter={onSetFilter}/>)}
            {/* later, when I'll have a carousel, I'll change the higher bound to 10 */}
        </div>
    )
}