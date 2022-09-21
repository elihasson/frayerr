export const UserGigList = ({ gigs, onRemoveGig, onUpdateGig }) => {
    return (
        <div className="gig-list main-layout">
            {gigs.map(gig => <GigPreview key={gig._id} gig={gig}
                onRemoveGig={onRemoveGig}
                onUpdateGig={onUpdateGig}
            />)}
        </div>
    )
}