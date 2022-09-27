import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';



import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { loadOrders, setOrderFilterBy, removeOrder, updateOrder } from '../store/order.actions'
import { useParams } from 'react-router-dom';

export const OrderList = (props) => {

	const params = useParams()
	const dispatch = useDispatch()

	// const [userId, setUserId] = useState('')

	const orders = useSelector(state => state.orderModule.orders)
	console.log('orders:', orders)

	useEffect(() => {
		const userIdFromParams = params.userId
		dispatch(setOrderFilterBy({
			userIdSeller: userIdFromParams,
			userIdBuyer: '',
			status: '',
		}))
		dispatch(loadOrders())
		// setUserId(userIdFromParams)
	}, [])

	const createData = (title, gigPrice, buyerName, orderId, orderStatus) => {
		return { title, gigPrice, buyerName, orderId, orderStatus };
	}

	let rows = []

	rows = orders?.map((order) => {
		const title = order.gig?.title
		const gigPrice = order.gig?.price
		const buyerName = order.buyer?.fullname
		const orderId = order._id
		const orderStatus = order.status
		return createData(title, gigPrice, buyerName, orderId, orderStatus)
	})

	const changeOrderStatus = (orderId, action) => {
		if (action === 'delete') return dispatch(removeOrder(orderId))
		const order = orders.filter(order => order._id === orderId)
		if (action === 'decline' || action === 'accept') {
			order[0].status = action
			dispatch(updateOrder(order[0]))
		}
	}

	return (
		<div>
			<div className='user-order-heading'>
				{orders.length !== 0 ? 'Your orders:' : 'No orders yet :('}
			</div>

			{(orders.length !== 0) && <TableContainer component={Paper} className="order-list">
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Gig ordered</TableCell>
							<TableCell align="center">Price</TableCell>
							<TableCell align="center">Buyer Name</TableCell>
							<TableCell align="center">Order status</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.title}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.title}
								</TableCell>
								<TableCell align="center">{row.gigPrice}</TableCell>
								<TableCell align="center">{row.buyerName}</TableCell>
								<TableCell align="center">{row.orderStatus}</TableCell>
								<TableCell align="center">
									{/* <button className='btn' onClick={() =>changeOrderStatus(row.orderId, 'accept')} >Accept</button>
                <button className='btn-red' onClick={() => changeOrderStatus(row.orderId, 'decline')}>Decline</button> */}
									<IconButton aria-label="accept" onClick={() => changeOrderStatus(row.orderId, 'accept')}>
										<DoneOutlineRoundedIcon />
									</IconButton>
									<IconButton aria-label="decline" onClick={() => changeOrderStatus(row.orderId, 'decline')}>
										<CloseRoundedIcon />
									</IconButton>
									<IconButton aria-label="delete" onClick={() => changeOrderStatus(row.orderId, 'delete')}>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>}
		</div>
	)
}
