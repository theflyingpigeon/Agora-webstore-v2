const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user_id:{
        type: String,
        default: ''
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    paymentID:{
        type: String,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    cart:{
        type: Array,
        default: []
    },
    status:{
        type: Boolean,
        default: false
    },
    trackAndTrace:{
        type: String,
        default: ''
    },
    shippingCompany: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Payments", paymentSchema);