import React from "react";
import axios from "axios";

const ContactForm = (name, payment, status, tracking, paymentID, cart) => {

    const sendEmail = () => {
        axios.post('/user/email', {status, paymentID, cart, name})
        console.log('payment var', payment)
    };

    sendEmail()
}

export default ContactForm