const Customer = require('../models/customers')

class customerController {

    async getAllCustomer(req, res, next ) {
        try {
            const customer = await Customer.find()
            res.status(200).json(customer)
        } catch (error) {
            res.status(404).json({error: 'Intern Server Error'})
        }
    }

    async getOneCustomer(req, res, next ) {
          try {
            const { customerId } = req.params
            const customer = await Customer.findOne({id:customerId})
            if(customer) res.status(200).json(customer)
            else return res.status(404).json('The Customer not found')
          } catch (error) {
            return res.status(500).json('Error internal server')
          }
    }

    
    async addCustomer(req, res, next) {
        try {
          const { id, idUser, name, address, phone } = req.body;
          const customer = await Customer.findOne({id:id})
          if (customer) {
            return res.status(409).json({ error: 'Customer already exists' });
          }
      
          const newCustomer = new Customer({ id, idUser, name, address, phone });
          await newCustomer.save();
      
          return res.status(200).json({ message: 'New Customer created successfully' });
        } catch (error) {

          return res.status(500).json({ error: 'Internal server error' });

        }
    }

    async deleteCustomer(req, res, next) {
        try {
            const { customerId } = req.params
            const customer = await Customer.findOne({id:customerId})
            if(!customer) res.json(404).json('Could not find the Customer')
            res.status(200).json('Delete Customer successfully')
        } catch (error) {
            res.status(404).json({error: 'Intern Server Error'})
        }
    }

    async deleteAllCustomer(req, res, next) {
        try {
            const customer = await Customer.find()
            if(!customer) res.json(404).json('Could not find the Customer')
            res.status(200).json('Delete all Customer successfully')
        } catch (error) {
            res.status(404).json({error: 'Intern Server Error'})
        }
    }

    async updateCustomer(req, res, next) {
        try {

        } catch (error) {
          return res.status(500).json({ error: 'Internal server error' });
        }
      }
}

module.exports = new customerController