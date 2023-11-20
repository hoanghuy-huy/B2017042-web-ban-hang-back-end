const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const middlewareController = require('../controllers/MiddlewareController')


router.delete('/:userId/cart/:productId',userController.removeProductFromCart)
router.post('/:userId/cart/:productId',userController.addToCart)
router.get('/:userId/cart',userController.getAllCart)

router.delete('/:userId',userController.deleteUser)
router.post('/:userId',userController.editUser)
router.get('/:userId',userController.getOneUser)
router.get('/',userController.getAllUser)

module.exports = router