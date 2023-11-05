const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const middlewareController = require('../controllers/MiddlewareController')

router.delete('/:id',middlewareController.verifyTokenAndAdminAuth,userController.deleteUser)
router.get('/',middlewareController.verifyToken,userController.getAllUser)

module.exports = router