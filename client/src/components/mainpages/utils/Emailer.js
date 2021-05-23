import axios from "axios";

const ContactForm = (paymentID) => {

    const sendEmail = async () => {
        await axios.post('/user/email', {paymentID})
    };
    sendEmail()
}

export default ContactForm