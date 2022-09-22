

import { OrderList } from './order-list.jsx'


export const UserOrder = (props) => {


    return (
        <section className='user-order-container'>
            <div className='user-order-heading'>Your orders:</div>
            <OrderList />
        </section>
    )
}