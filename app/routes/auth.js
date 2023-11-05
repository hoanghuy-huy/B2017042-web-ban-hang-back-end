const express = require('express')
const router = express.Router()
const middlewareController = require('../controllers/MiddlewareController')
const authController = require('../controllers/AuthController')


// router.post('/reset-password',authController.resetPassword)
// router.post('/forgot-password',authController.forgotPassword)
router.post('/logout',middlewareController.verifyToken,authController.userLogout)
router.post('/refresh',authController.refresh)
router.post('/login',authController.login)
router.post('/register',authController.register)



module.exports = router