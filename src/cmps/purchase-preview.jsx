import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeOrder, updateOrder } from "../store/order.actions";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// import { UserProfileImg } from "../profile/UserProfileImg"
// import { socketService } from "../../services/socket.service";
// import { utilService } from "../../services/util.service";

export const PurchasePreview = ({ order, type, user, onChangeStatus }) => {

    const dispatch = useDispatch()

    let statusClass
    let statusTxt

    const fullname = order?.seller?.fullname

    useEffect(() => {
    }, [])

    if (order.status === ('pending')) {
        statusClass = 'gray'
        statusTxt = 'Pending'
    }
    if (order.status === 'decline'){
         statusClass = 'deactivated red'
         statusTxt = 'Order was declined'
    }
    if (order.status === 'accept' || order.status === 'done') {
        statusClass = 'green'
        if(order.status === 'done') statusTxt = 'Order delivered'
        if(order.status === 'accept') statusTxt = 'Order in work'
    }

    const formatDate = () => {
        var { createdAt } = order
        console.log('createdAt (purchase preview):', createdAt)
        createdAt = new Date(createdAt)
        var month = createdAt.toLocaleString('default', { month: 'short' })
        var year = createdAt.getFullYear();
        var hours = createdAt.getHours();
        var minutes = createdAt.getMinutes();
        if (hours < 10) hours = `0${hours}`;
        if (minutes < 10) minutes = `0${minutes}`;
        var formatedDate = `${hours}:${minutes} ${month} ${year}`
        return formatedDate;
    }

    const changeOrderStatus = (orderId, action) => {
        console.log('order:', order._id)
        console.log('order12341234:', orderId)
        if (action === 'delete') return dispatch(removeOrder(orderId))
        if (action === 'decline' || action === 'accept') {
            order.status = action
            dispatch(updateOrder(order))
        }
    }

    console.log('statusClass:', statusClass)
    return (
        <section className={`order-preview flex`}>
            <div className="main">
                <NavLink className="gig-img" to={`/explore/${order?.gig?._id}`}>
                    <div className='img-container'>
                        <img src={order?.gig?.img?.imgUrl} alt='img' />
                        <div className="gig-img-title-container">
                            <span>Title:</span>
                            <span className="gig-img-title">{order?.gig?.title}</span>
                        </div>
                    </div>
                </NavLink>
                <div className='user-info flex'>
                    <h5>Seller:</h5>
                    {/* <UserProfileImg isLink={true} user={order[showingType]} /> */}
                    <img src={order?.seller?.imgUrl} alt='img' />
                    <span>{fullname}</span>
                </div>
                <div className='gig-info flex'>
                    <span className='price'>Price</span>
                    <span>{order?.gig?.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
                </div>
                <div className="delivery-container flex">
                    <span className='delivery-time'>Delivery Time</span>
                    <span className='days'>{order?.gig?.daysToMake === 1 ? `${order?.gig?.daysToMake} day` : `${order?.gig?.daysToMake} days`}</span>
                </div>
                <div className="order-date flex">
                    <span className='title'>Issued At</span>
                    <span className='date'>{formatDate()}</span>
                </div>
            </div>
            <div className="status-container">

                <IconButton aria-label="delete" onClick={() => changeOrderStatus(order?._id, 'delete')}>
                    <DeleteIcon />
                </IconButton>

                <span className='order-type'>Order Status:</span>

                <span className={`status ${statusClass}`}>{statusTxt}</span>
            </div>
        </ section >
    )
}