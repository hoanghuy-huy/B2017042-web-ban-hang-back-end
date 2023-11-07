const Product = require('../models/products')

class productController {

    async getAllProduct(req, res, next ) {
        try {
            const product = await Product.find()
            res.status(200).json(product)
        } catch (error) {
            res.status(404).json({error: 'Intern Server Error'})
        }
    }

    async getOneProduct(req, res, next ) {
          try {
            const { productId } = req.params
            const product = await Product.findOne({id:productId})
            if(product) res.status(200).json(product)
            else return res.status(404).json('The product not found')
          } catch (error) {
            return res.status(500).json('Error internal server')
          }
    }

    
    async addProduction(req, res, next) {
        try {
          const { id, name, price, description, category , note, imageUrl, averageRating, quantity } = req.body;
          const product = await Product.findOne({id:id})
          if (product) {
            return res.status(409).json({ error: 'Product already exists' });
          }
      
          const newProduct = new Product({id, name, price, description, category , note, imageUrl, averageRating, quantity});
          await newProduct.save();
      
          return res.status(200).json({ message: 'New product created successfully' });
        } catch (error) {

          return res.status(500).json({ error: 'Internal server error' });

        }
    }

    async deleteProduct(req, res, next) {
        try {
            const { productId } = req.params
            const product = await Product.findOne({id:productId})
            if(!product) res.json(404).json('Could not find the product')
            res.status(200).json('Delete product successfully')
        } catch (error) {
            res.status(404).json({error: 'Intern Server Error'})
        }
    }

    async deleteAllProduct(req, res, next) {
        try {
            const product = await Product.find()
            if(!product) res.json(404).json('Could not find the product')
            res.status(200).json('Delete all product successfully')
        } catch (error) {
            res.status(404).json({error: 'Intern Server Error'})
        }
    }

    async updateProduct(req, res, next) {
        try {
          const { id, name, price, description, category , note, imageUrl, averageRating, quantity } = req.body;
      
          const product = await Product.findOneAndUpdate({id:id});
          if (!product) {
            return res.status(404).json({ error: 'Could not find the product' });
          }else {
            const doc = await Product.findOneAndUpdate({id:id})
            if(id === product.id){
                product.name = name;
                product.price = price;
                product.description = description;
                product.category = category;
                product.note = note;
                product.imageUrl=imageUrl;
                product.averageRating = averageRating;
                product.quantity = quantity
                await product.save();
                return res.status(200).json("update product successfully")
            }
            if(doc) return res.status(409).json("Can't update, Because product id already exists")
            
            product.name = name;
            product.price = price;
            product.description = description;
            product.category = category;
            product.note = note;
            product.imageUrl=imageUrl;
            product.averageRating = averageRating;
            product.quantity = quantity
            await product.save();
            return res.status(200).json("update product successfully")
          }
        
        } catch (error) {
          return res.status(500).json({ error: 'Internal server error' });
        }
      }

}

module.exports = new productController