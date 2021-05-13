const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/products')
    .get(productCtrl.getProducts)
    .post(productCtrl.createProduct)


router.route('/products/:id')
    .delete(productCtrl.deleteProduct)
    .put(productCtrl.updateProduct)

router.route('/updateStock')
    .post(productCtrl.updateStock)

router.route('/setStock')
    .post(productCtrl.setStock)

router.route('/setSize')
    .post(productCtrl.setSize)

module.exports = router