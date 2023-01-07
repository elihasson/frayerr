import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeOrder, updateOrder } from "../store/order.actions";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { setIsNewOrder } from "../store/system.actions";


// import { UserProfileImg } from "../profile/UserProfileImg"
// import { socketService } from "../../services/socket.service";
// import { utilService } from "../../services/util.service";

export const OrderPreview = ({ order, type, user, onChangeStatus }) => {

    const dispatch = useDispatch()

    const fullname = order.buyer.fullname;
    var statusClass;

    useEffect(() => {
        dispatch(setIsNewOrder(false))
    })

    // if (order.status === ('pending' || 'delivered')) statusClass = 'gray';
    // if (order.status === 'rejected') statusClass = 'deactivated red';
    // if (order.status === 'active') {
    //     if (type === 'seller') statusClass = 'deactivated green'
    //     else statusClass = 'green';
    // }

    // const getStatus = () => {
    //     switch (order.status) {
    //         case 'pending': {
    //             return 'Approve'
    //         }
    //         case 'accept': {
    //             return 'Active'
    //         }
    //         case 'decline': {
    //             return 'Rejected'
    //         }
    //     }

    // }

    const formatDate = () => {
        var { createdAt } = order
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
        if (action === 'delete') return dispatch(removeOrder(orderId))
        else {
            order.status = action
            dispatch(updateOrder(order))
        }
    }

    return (
        <section className={`order-preview flex`}>
            <div className="main">
                <NavLink className="gig-img" to={`/explore/${order.gig._id}`}>
                    <div className='img-container'>
                        <img src={order.gig.img.imgUrl} alt='img' />
                        <div className="gig-img-title-container">
                            <span>Title:</span>
                            <span className="gig-img-title">{order.gig.title}</span>
                        </div>
                    </div>
                </NavLink>
                <div className='user-info flex'>
                    <h5>Buyer:</h5>
                    <img src={order.buyer.imgUrl} alt='img' />
                    <span>{fullname}</span>
                </div>
                <div className='gig-info flex'>
                    <span className='price'>Price</span>
                    <span>{order.gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
                </div>
                <div className="delivery-container flex">
                    <span className='delivery-time'>Delivery Time</span>
                    <span className='days'>{order.gig.daysToMake === 1 ? `${order.gig.daysToMake} day` : `${order.gig.daysToMake} days`}</span>
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

                {order.status === 'done' && <span className='order-type'>Order Status:</span>}
                <div className='btn-wrapper flex'>
                    {order.status === 'pending' && <button className={`button green`}
                        onClick={() => {
                            changeOrderStatus(order._id, 'accept')
                        }}>
                        Accept
                    </button>}
                    {order.status === 'pending' && <button className={'button red'}
                        onClick={() => {
                            changeOrderStatus(order._id, 'decline')
                        }}>Reject
                    </button>}

                    {order.status === 'accept' && <button className={`button green`}
                        onClick={() => {
                            changeOrderStatus(order._id, 'done')
                        }}>
                        Completed
                    </button>}
                    {order.status === 'accept' && <button className={'button red'}
                        onClick={() => {
                            changeOrderStatus(order._id, 'pending')
                        }}>Pending
                    </button>}

                    {order.status === 'done' && <span className={`status green`}>Delivered</span>}
                </div>

            </div>
        </ section >
    )
}