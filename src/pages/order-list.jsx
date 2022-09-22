import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { userService } from '../services/user.service'

import { loadOrders, setFilterUserId } from '../store/order.actions'
import { loadUser } from '../store/user.actions'
import { useParams } from 'react-router-dom';

export const OrderList = (props) => {

  const params = useParams()
  const dispatch = useDispatch()

  const [userId, setUserId] = useState('')

  const orders = useSelector(state => state.orderModule.orders)
  console.log('orders:', orders)

  useEffect(() => {
    const userIdFromParams = params.userId
    dispatch(setFilterUserId(userIdFromParams))
    dispatch(loadOrders())
    setUserId(userIdFromParams)
  }, [])

  function createData(name, gigPrice, buyerName) {
    return { name, gigPrice, buyerName };
  }

  let rows = []

  // const makeRows = async () => {
    rows = orders?.map(async (order) => {
      const name = order.gig.name
      const gigPrice = order.gig.price
      const buyer = await userService.getById(order.buyer._id)
      const buyerName = buyer.fullname
      console.log('buyerName:', buyerName)
      return (() => createData(name, gigPrice, buyerName))
    })
  // }

  console.log('rows:', rows)

  ;(async () => {
    console.log('rows1231223:', rows)
   })()
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),

  // ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Gig ordered</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Buyer Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.gigPrice}</TableCell>
              <TableCell align="right">{row.buyerName}</TableCell>
              <TableCell align="right">
                <button className='btn' >Accept</button>
                <button className='btn-red' >Decline</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
