import React from 'react';


const Cart = (props) => {
    const cart = props.cart;

    // const total = cart.reduce((total, prd) => total + prd.price, 0);

    let price = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        price = price + product.price * product.quantity || 1;
    }
    let shipping = 0;
    if (price > 35) {
        shipping = 10.99;
    }
    else if (price > 15) {
        shipping = 4.99;
    }

    const tax = price * 0.1;
    const total = price + shipping + tax;

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h4 className="text-primary">Order Summary </h4>
            <p>Item Orders : {cart.length}</p>
            <p>Product Price: {formatNumber(price)} </p>
            <p>Shipping Cost: {shipping}</p>
            <p>Tax Value: {formatNumber(tax)}</p>
            <p>Total Price: {formatNumber(total)}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;