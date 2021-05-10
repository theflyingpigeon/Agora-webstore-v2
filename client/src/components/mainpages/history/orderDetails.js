import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {GlobalState} from "../../../GlobalState";

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderdetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item => {
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    }, [params.id, history])
    
    if(orderdetails.length === 0 ) return  null;

    return (
        <div className={"history-page"}>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Postal Code</th>
                    <th>Country Code</th>
                    <th>Shipped</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{orderdetails.address.recipient_name}</td>
                    <td>{orderdetails.address.line1 + " - " + orderdetails.address.city}</td>
                    <td>{orderdetails.address.postal_code}</td>
                    <td>{orderdetails.address.country_code}</td>
                    <td>{orderdetails.status ? "Shipped" : "Ongoing"}</td>
                </tr>
                </tbody>
            </table>

            <table style={{margin: "30px 0px"}}>
                <thead>
                <tr>
                    <th></th>
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {
                    orderdetails.cart.map(items => (
                        <tr key={items._id}>
                            <td><img src={items.images.url} alt={"product [hoto"}/></td>
                            <td>{items.title}</td>
                            <td>{items.quantity}</td>
                            <td>€{(items.price * items.quantity).toFixed(2)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </div>
    );
}

export default OrderDetails;