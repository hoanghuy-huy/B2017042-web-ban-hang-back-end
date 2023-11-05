const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()


// Path /product
router.get('/',productController.getAllProduct)
router.post('/',productController.addProduction)
router.delete('/',productController.deleteAllProduct)

// Path 
router.delete('/:id',productController.deleteProduct)
router.get('/:id',productController.getOneProduct)
router.put('/:id',productController.updateProduct)


module.exports = router
