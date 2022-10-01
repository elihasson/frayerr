import { PurchaseList } from './purchase-list.jsx'


export const UserPurchase = (props) => {

    return (
        // <section className='user-purchase-container'>
        <div className="orders-section">
            <section className='orders-content'>
                <h3>Purchased gigs</h3>
                <PurchaseList />
            </section>
        </div >
    )
}