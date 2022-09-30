import { PurchaseList } from './purchase-list.jsx'


export const UserPurchase = (props) => {

    return (
        // <section className='user-purchase-container'>
        <div className="orders-section">
            <section className='orders-content'>
                {/* Purchased Orders is shown as My Orders*/}
                <h3>My Orders</h3>
                <PurchaseList />
            </section>
        </div >
    )
}