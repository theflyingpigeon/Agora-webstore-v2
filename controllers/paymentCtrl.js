const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')
const {mailGenarator, transporter} = require('../middleware/emailer')


const paymentCtrl = {
    getPayments: async (req, res) => {
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            // if(!user) return res.status(400).json({msg: "User does not exist."})

            const {cart, paymentID, address} = req.body;
            const {_id, name, email} = user;


            const newPayment = new Payments({
                user_id: _id, name, email, cart, paymentID, address
            })


            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })


            await newPayment.save()
            res.json({msg: "Payment success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    sendProduct: async (req, res) => {
        try {
            const payment = await Payments.findByIdAndUpdate(req.body.id, {
                status: true,
                trackAndTrace: req.body.trackAndTrace,
                shippingCompany: req.body.shippingCompany
            })

            const shippment = await Payments.findById(req.body.id)

            let itemlist = []

            shippment.cart.forEach(product => {
                itemlist = [...itemlist, {Name: product.title, quantity: product.quantity, price: product.price}]
            })

            const email = {
                body: {
                    name: shippment.name,
                    intro: `Your order (order number: ${shippment.paymentID}) has been shipped to you with PostNL. The Track and trace code is ${shippment.trackAndTrace}`,
                    table: {
                        data: itemlist
                    },
                    action: {
                        instructions: "Click on the button bellow to follow your order",
                        button: {
                            text: "Follow your order",
                            link: `https://jouw.postnl.nl/track-and-trace/${shippment.trackAndTrace}-${shippment.address.country_code}-${shippment.address.postal_code}`
                        }
                    },
                    outro: 'We thank you for your order by The Agora merch store'
                }
            };

            const emailBody = mailGenarator.generate(email);

            const emailText = mailGenarator.generatePlaintext(email);

            transporter.sendMail({
                to: 'shaeme@icloud.com',        //replace with customer mail (payment.email)
                subject: 'Order confirmation from Agora',
                html: emailBody,
                text: emailText,
            }, function (err) {
                if (err) return console.log(err);
                console.log("Message send successfully")
            })

            if (!payment) return res.status(400).json({msg: "This payment does not exists"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    createPaymentWOA: async (req, res) => {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const paymentID = req.body.paymentID;
            const address = req.body.address;
            const cart = req.body.cart;

            const newPayment = new Payments({
                name, email, cart, paymentID, address
            })
            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })


            await newPayment.save()
            res.json({msg: "Payment success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const sold = async (id, quantity, oldSold) => {
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl