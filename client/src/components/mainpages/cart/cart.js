import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from "./paypalButton";
import Emailer from "../utils/Emailer";

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const [isLogged] = state.userAPI.isLogged

    const shipmentFrees = 6.75

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return ((prev + (item.price * item.quantity) + shipmentFrees).toFixed(2))
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
                axios.post('/api/updateStock', {id: item._id, stock: item.stock, quantity: 1, state: true}) //When state is true the stock will decrease
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
                axios.post('/api/updateStock', {id: item._id, stock: item.stock, quantity: 1, state: false}) //When state is false the stock will increase
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                    axios.post('/api/updateStock', {id: item._id, stock: item.stock, quantity: item.quantity, state: false}) //When state is false the stock will increase
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;


        if(isLogged){
            await axios.post('/api/payment', {cart, paymentID, address}, {
                headers: {Authorization: token}
            })
        } else {
            const data = {
                name: address.recipient_name,
                email: payment.email,
                paymentID: paymentID,
                address: address,
                cart: cart
            }
            await axios.post('/api/paymentWOA', {
                name: address.recipient_name,
                email: payment.email,
                paymentID: paymentID,
                address: address,
                cart: cart
            })
            console.log(data)
        }

        Emailer({name: address.recipient_name}, payment, false, "", paymentID, cart)

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")
        // console.log(payment)
    }


    if(cart.length === 0)
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2>

    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <h3>€ {(product.price * product.quantity).toFixed(2)}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>

                            <div className="delete"
                                 onClick={() => removeProduct(product._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className={"column"}>
                <div className="total">
                    <h3>Shipment fees: €{shipmentFrees}</h3>
                    <h3>Total: €{total}</h3>
                    <PaypalButton
                        total={total}
                        tranSuccess={tranSuccess} />
                </div>
            </div>
        </div>
    )
}

export default Cart