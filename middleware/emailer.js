const nodemailer = require('nodemailer');

const Mailgen = require('mailgen')

const email = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const service = process.env.SERVICE;

const transporter = nodemailer.createTransport({
    service: service,
    secure: true,
    auth: {
        user: email,
        pass: pass
    },
});

const mailGenarator = new Mailgen({
    theme: 'salted',
    product: {
        name: 'test name',
        link: 'https://duckduckgo.com'
    }
})

module.exports = {mailGenarator, transporter};