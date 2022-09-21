import { GigPreview } from '../cmps/gig-preview.jsx'

export const GigList = ({ gigs, onRemoveGig, onUpdateGig, onAddToCart, history }) => {
    
    if(!gigs) return <div>No gigs Found, try again</div>
    return (
        <div className="gig-list main-layout">
                    {gigs.map(gig => <GigPreview key={gig._id} gig={gig}
                        onRemoveGig={onRemoveGig}
                        onUpdateGig={onUpdateGig}
                        onAddToCart={onAddToCart}
                     />)}
                </div>
    )
}