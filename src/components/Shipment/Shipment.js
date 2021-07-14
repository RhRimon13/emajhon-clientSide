import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Payment from '../Payment/Payment';
import './Shipment.css'

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, errors } = useForm();
    const [shippingData, setShippingData] = useState(null);


    const onSubmit = data => {
        setShippingData(data);
    };


    const handlePaymentSuccess = paymentId => {
        const saveCart = getDatabaseCart();
        const orderDetails = {
            ...loggedInUser,
            products: saveCart,
            paymentId,
            shipment: shippingData,
            orderTime: new Date()
        };


        fetch('https://stormy-springs-45407.herokuapp.com/addorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('Your order placed successfully...')
                }
            })
    }


    return (
        <div className="row">
            <div style={{ display: shippingData ? 'none' : 'block' }} className="col-md-6">
                <form className="ship-form" form onSubmit={handleSubmit(onSubmit)} >
                    < input defaultValue={loggedInUser.name} name="name" ref={register({ required: true })} placeholder="Your Name" />
                    {errors.name && <span className="error">Name is required</span>}

                    < input defaultValue={loggedInUser.email} name="email" ref={register({ required: true })} placeholder="Your E-mail" />
                    {errors.email && <span className="error">Email is required</span>}

                    < input name="address" ref={register({ required: true })} placeholder="Your Address" />
                    {errors.address && <span className="error">Address is required</span>}

                    < input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
                    {errors.phone && <span className="error">Phone number is required</span>}

                    <input type="submit" />
                </form>
            </div>

            <div style={{ display: shippingData ? 'block' : 'none' }} className="col-md-6">
                <h2>Pay Your Bill</h2>
                <Payment handlePayment={handlePaymentSuccess}></Payment>
            </div>
        </div>
    );
};

export default Shipment;