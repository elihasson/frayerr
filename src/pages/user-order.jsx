import { NavLink } from 'react-router-dom'

import { OrderList } from './order-list.jsx'


export const UserOrder = (props) => {


    return (
        <section className='user-order-container'>
            <h3>Manage orders</h3>
            <OrderList />
        </section>
    )
}