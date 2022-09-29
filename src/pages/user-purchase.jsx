import { PurchaseList } from './purchase-list.jsx'


export const UserPurchase = (props) => {

    return (
        <section className='user-purchase-container'>
            <h3>Purchased Orders</h3>
            <PurchaseList />
        </section>
    )
}