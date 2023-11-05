const Product = require('../models/products')

class productController {


    
    async getAllProduct (req, res, next ) {
        try {
            const product = await Product.find()
            res.status(200).json(product)
        } catch (error) {
            res.status(404).json({error: 'Intern Server Error'})
        }
    }

    async getOneProduct(req, res, next ) {
        try {
            const product = await Product.findById(req.params.id)
            if(!product) res.json(404).json('Product not found')
            res.status(200).json(product)
        } catch (error) {
            res.status(404).json({error: 'Intern Server Error'})
        }
    }

    
    async addProduction(req, res, next) {
        try {
          const { name, price, description, category } = req.body;
          const product = await Product.findOne({ name: req.body.name });
      
          if (product) {
            return res.status(409).json({ error: 'Product already exists' });
          }
      
          const newProduct = new Product({ name, price, description, category });
          await newProduct.save();
      
          return res.status(200).json({ message: 'New product created successfully' });
        } catch (error) {
          return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params.id)
            if(!product) res.json(404).json('Product not found')
            res.status(200).json('Delete product successfully')
        } catch (error) {
            res.status(404).json({error: 'Intern Server Error'})
        }
    }

    async deleteAllProduct(req, res, next) {
        try {
            const product = await Product.find()
            if(!product) res.json(404).json('Product not found')
            res.status(200).json('Delete all product successfully')
        } catch (error) {
            res.status(404).json({error: 'Intern Server Error'})
        }
    }

    async updateProduct(req, res, next) {
        try {
          const { name, price, description, category } = req.body;
      
          const product = await Product.findById(req.params.id);
          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }else {
            const doc = await Product.findOne({name:req.body.name})
            if(req.body.name === product.name){
                product.name = name;
                product.price = price;
                product.description = description;
                product.category = category;
                await product.save();
                return res.status(200).json("update product successfully")
            }
            if(doc) return res.status(409).json("Can't update, Because product name already exists")
            
            product.name = name;
            product.price = price;
            product.description = description;
            product.category = category;
            await product.save();
            return res.status(200).json("update product successfully")
          }
        
        } catch (error) {
          return res.status(500).json({ error: 'Internal server error' });
        }
      }

}

module.exports = new productController