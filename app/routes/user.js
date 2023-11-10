const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const middlewareController = require('../controllers/MiddlewareController')


router.delete('/:userId/cart/:productId',userController.removeProductFromCart)
router.post('/:userId/cart/:productId',userController.addToCart)
router.get('/:userId/cart',userController.getAllCart)

router.delete('/:userId',middlewareController.verifyTokenAndAdminAuth,userController.deleteUser)
router.get('/:userId',middlewareController.verifyToken,userController.getOneUser)
router.get('/',middlewareController.verifyToken,userController.getAllUser)

module.exports = router