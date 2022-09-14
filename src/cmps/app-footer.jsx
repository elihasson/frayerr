
import React, { useState } from 'react'
import { connect } from 'react-redux'

import { removeFromCart, checkout } from '../store/gig.actions'
import { UserMsg } from './user-msg.jsx'

function _AppFooter({ count, cart, removeFromCart, checkout }) {
    const [isCartShown, setIsCartShown] = useState(false)


    function getCartTotal() {
        return cart.reduce((acc, gig) => acc + gig.price, 0)
    }

    return (
        <footer className="app-footer">
            <p>
                coffeerights - count: {count}
            </p>
            {cart.length > 0 &&
                <h5>
                    <span>{cart.length}</span> Products in your Cart
                    <button className="btn-link" onClick={(ev) => {
                        ev.preventDefault();
                        setIsCartShown(!isCartShown)
                    }}>
                        ({(isCartShown) ? 'hide' : 'show'})
                    </button>
                </h5>
            }

            {isCartShown && cart.length > 0 && <section className="cart" >
                <h5>Your Cart</h5>
                <ul>
                    {
                        cart.map((gig, idx) => <li key={idx}>
                            <button onClick={() => {
                                removeFromCart(gig._id)
                            }}>x</button>
                            {gig.vendor}
                        </li>)
                    }
                </ul>
                <p>Total: ${getCartTotal().toLocaleString()} </p>
                <button onClick={checkout}>Checkout</button>
            </section>}
            <UserMsg />
        </footer>
    )
}


function mapStateToProps(state) {
    return {
        count: state.userModule.count,
        cart: state.gigModule.cart
    }
}

const mapDispatchToProps = {
    checkout,
    removeFromCart
}

export const AppFooter = connect(mapStateToProps, mapDispatchToProps)(_AppFooter)