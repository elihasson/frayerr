import { GigPreview } from '../cmps/gig-preview.jsx'

export const GigList = ({ gigs, onRemoveGig, onUpdateGig, onAddToCart }) => {
    return (
        <div className="gig-list">
                    {gigs.map(gig => <GigPreview key={gig._id} gig={gig}
                        onRemoveGig={onRemoveGig}
                        onUpdateGig={onUpdateGig}
                        onAddToCart={onAddToCart} />)}
                </div>
    )
}