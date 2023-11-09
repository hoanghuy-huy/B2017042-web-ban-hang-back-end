const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()


// Path /products
router.get('/',productController.getAllProduct)
router.post('/',productController.addProduction)
router.delete('/',productController.deleteAllProduct)

// Path 
router.delete('/:productId',productController.deleteProduct)
router.put('/:productId',productController.updateProduct)
router.get('/:productId',productController.getOneProduct)

module.exports = router
