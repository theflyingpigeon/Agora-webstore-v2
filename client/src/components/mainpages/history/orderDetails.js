import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {GlobalState} from "../../../GlobalState";
import axios from "axios";


export default function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderdetails, setOrderDetails] = useState([])
    const [isAdmin] = state.userAPI.isAdmin
    const [trackATrace, setTrackATrace] = useState('');
    const [shippingCompany, setShippingCompany] = useState('');

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item => {
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    }, [params.id, history])
    
    if(orderdetails.length === 0 ) return  null;

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const body = {
            id: orderdetails._id,
            trackAndTrace: trackATrace,
            shippingCompany: shippingCompany
        }
        formData.forEach((value, property) => [property] = value)
        await axios.post('/api/shipped', {id:orderdetails._id, trackAndTrace: trackATrace, shippingCompany: shippingCompany})
        console.log(body)
    }

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
                    <th>track & trace code</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{orderdetails.address.recipient_name}</td>
                    <td>{orderdetails.address.line1 + " - " + orderdetails.address.city}</td>
                    <td>{orderdetails.address.postal_code}</td>
                    <td>{orderdetails.address.country_code}</td>
                    <td>{orderdetails.status ? "Shipped" : "Ongoing"}</td>
                    <td>{orderdetails.status ? "Shipped" : "Not availible"}</td>
                </tr>
                </tbody>
            </table>


            {
                orderdetails.status ?
                    <table style={{margin: "30px 0px"}}>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Company</th>
                            <th>Track and Trace Code</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td></td>
                            <td>{orderdetails.shippingCompany}</td>
                            <td>{orderdetails.trackAndTrace}</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                    :
                    ""
            }

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
                            <td><img src={items.images.url} alt={"product"}/></td>
                            <td>{items.title}</td>
                            <td>{items.quantity}</td>
                            <td>€{(items.price * items.quantity).toFixed(2)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            {
                isAdmin ?
                    <div className={"create_product"}>
                        <form onSubmit={e => handleSubmit(e)}>
                            <label>Track & trace code</label>
                            <input type={"text"} placeholder={"Track and trace code"} name={"trackAndTrace"}  onChange={text => setTrackATrace(text.target.value
                            )} value={trackATrace} required/>
                            <br />
                            <div className={"row"}>
                                <select name={"ShippingCompany"} onChange={text => setShippingCompany(text.target.value)} value={shippingCompany}>
                                    <option value={""}>Please select a shipping company</option>
                                    <option value={"PostNL"}>PostNL</option>
                                    <option value={"DHL"}>DHL</option>
                                    <option value={"DPD"}>DPD</option>
                                </select>
                            </div>
                            <br />
                            <button type={"submit"}>Shipped</button>
                        </form>
                    </div>
                    :
                    ""
            }

        </div>
    );
}