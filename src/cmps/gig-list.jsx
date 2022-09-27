import { GigPreview } from '../cmps/gig-preview.jsx'

export const GigList = ({ gigs, onRemoveGig, onUpdateGig}) => {
    
    if(!gigs) return <div>No gigs Found, try again</div>
    return (
        <div className="gig-list">
                    {gigs.map(gig => <GigPreview key={gig._id} gig={gig}
                        onRemoveGig={onRemoveGig}
                        onUpdateGig={onUpdateGig}
                     />)}
                </div>
    )
}