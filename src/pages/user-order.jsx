import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setIsNewOrder } from '../store/system.actions.js'

import { OrderList } from './order-list.jsx'


export const UserOrder = (props) => {

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(setIsNewOrder(false))
    }, [])

    return (
        <section className='user-order-container'>
            <h3>Manage orders</h3>
            <OrderList />
        </section>
    )
}