const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()

const middlewareController = require('../controllers/MiddlewareController')
// Path /products
router.get('/',productController.getAllProduct)
router.post('/',productController.addProduct)
router.delete('/',productController.deleteAllProduct)

// Path 
router.delete('/:productId',productController.deleteProduct)
router.post('/:productId',productController.updateProduct)
router.get('/:productId',productController.getOneProduct)

module.exports = router
