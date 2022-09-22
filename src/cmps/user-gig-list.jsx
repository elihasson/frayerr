import { UserGigPreview } from './user-gig-preview'

export const UserGigList = ({ user, gigs, onRemoveGig, onUpdateGig }) => {
    return (
        <div className='gig-list main-layout'>
            <div>Here Are Some User gigs:</div>
            {console.log('gigs:', gigs)}
            {gigs.map(gig => <UserGigPreview key={gig._id} gig={gig}
                onRemoveGig={onRemoveGig}
                onUpdateGig={onUpdateGig}
            />)}
        </div>
    )
}