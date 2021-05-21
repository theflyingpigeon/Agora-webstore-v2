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

router.route('/setSizeStock')
    .post(productCtrl.setSizeStock)

router.route('/setStockS')
    .post(productCtrl.setStockS)

router.route('/setStockM')
    .post(productCtrl.setStockM)

router.route('/setStockL')
    .post(productCtrl.setStockL)

router.route('/setStockXL')
    .post(productCtrl.setStockXL)

module.exports = router