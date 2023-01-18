import { PurchaseList } from './purchase-list.jsx'

export const UserPurchase = (props) => {

    return (
        <div className="orders-section">
            <section className="orders-content">
                <h3>Purchased gigs</h3>
                <PurchaseList />
            </section>
        </div >
    )
}