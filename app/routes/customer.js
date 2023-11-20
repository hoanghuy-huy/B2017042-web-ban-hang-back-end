const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController')
const middlewareController = require('../controllers/MiddlewareController')

// Path /Customers
router.get('/',customerController.getAllCustomer)
router.post('/',customerController.addCustomer)
router.delete('/',customerController.deleteAllCustomer)

// Path 
router.delete('/:CustomerId',customerController.deleteCustomer)
router.put('/:CustomerId',customerController.updateCustomer)
router.get('/:CustomerId',customerController.getOneCustomer)


module.exports = router