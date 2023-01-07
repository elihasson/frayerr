import { UserDetails } from './user-details'
// import { SellerDetails } from './SellerDetails'


export function UserInfoCard({ user, showSellerStats }) {

    return (
        <div className="profile-details-container flex column justify-center align-center">
            <img className="user-img" src={user.imgUrl} />
            <label>{user.username}</label>
            <h4>icon edit</h4>
            <p>{user.smallDesc}</p>
            <div className='btn-container flex '>
                <button className='btn white'>cancel</button>
                <button className='btn'>update</button>
            </div>
            <h4>from</h4>
            <h4>member since</h4>
            {/* <UserDetails user={user} /> */}
            {/* {user.sellerInfo && <SellerDetails showSellerStats={showSellerStats} user={user} />} */}
        </div>
    )

}