// import * as React from 'react'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TableRow from '@mui/material/TableRow'
// import Paper from '@mui/material/Paper'
// import IconButton from '@mui/material/IconButton'
// import DeleteIcon from '@mui/icons-material/Delete'
// import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded'
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { PurchasePreview } from '../cmps/purchase-preview.jsx'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadOrders, setOrderFilterBy, removeOrder, updateOrder } from '../store/order.actions'
import { useParams } from 'react-router-dom'
import { socketService, SOCKET_EMIT_ORDER_UPDATE, SOCKET_EVENT_UPDATE_USER } from '../services/socket.service.js'

export const PurchaseList = () => {

	const params = useParams()
	const dispatch = useDispatch()

	const orders = useSelector(state => state.orderModule.orders)
	console.log('orders:', orders)

	useEffect(() => {
		const userIdFromParams = params.userId
		dispatch(setOrderFilterBy({
			userIdSeller: '',
			userIdBuyer: userIdFromParams,
			status: '',
		}))

		dispatch(loadOrders())
		socketService.on(SOCKET_EMIT_ORDER_UPDATE, (msg) => {
			if (msg === 'update-order') {
				console.log('msg', msg)
				dispatch(loadOrders())
            }
        })
		return () => {
			socketService.off(SOCKET_EMIT_ORDER_UPDATE)
		} 

	}, [])

	return (
        <ul className="clean-list orders-list">
            {orders && orders.map((order) => {
                return <li key={order._id} className={`order-item`}>
                    <PurchasePreview order={order}  />
                </li>
            })}
        </ul>
    )

}
