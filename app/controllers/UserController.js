const Product = require('../models/products');
const User = require('../models/user');
const Cart = require('../models/carts');

class userController {
    
    // get all user [GET] /user
    async getAllUser(req, res){
        try {
            const user = await User.find()
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    //[GET]  /users/:id/cart
    async getAllCart(req, res, next) {
        
    }

    async addToCart(req, res, next) {
        const {productId} = req.body
        const product = await Product.findOne({id:req.body._id})
        if(product){
            return res.status(200).json('Added the product to cart')
        }else {
            return res.status(404).json('Could not add product to cart')
        }
        
    }

    async removeProductFromCart(req, res, next) {
        const { productId } = req.params
        const cartItem = await Cart.find(req.param._id)
        res.status(200).json('Remove product from cart successfully')
    }
    
    // [Delete] user/:id
    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params._id)
            res.status(200).json('delete thanh cong')
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new userController