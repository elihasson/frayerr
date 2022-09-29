import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setIsNewOrder } from '../store/system.actions.js'

import { OrderList } from '../cmps/order-list'


export const UserOrder = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIsNewOrder(false))
    }, [])

    return (
        <div className="orders-section">
            <section className="orders-content">
                <h3>Manage orders</h3>
                <OrderList />
            </section>
        </div>
    )
}