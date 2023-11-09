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
    //[GET]  /users/:userId/cart
    async getAllCart(req, res, next) {
        // const { userId } = req.params
        // const user = await User.findOne({ id: userId })
        // if(!user) return res.status(404).json('Could not find user')
        // const products = await Product.find()
        // const cartItemIds = user.cartItem
        // const cartItem = cartItemIds.map(id => {
        //     products.find(product => product._id===id)
        // })
        res.status(200).json("cartItem")
    }   
    // [POST] /users/:userId/cart
    async addToCart(req, res, next) {
        // try {
        //     const { productId } = req.body
        //     const { userId } = req.params
        //     return res.status(200).json({ message: "Product added to cart successfully" });
        // } catch (error) {
        //     return res.status(404).json('Could not add item into cart')
        // }
        res.status(200).json("addToCard")
    }

    async removeProductFromCart(req, res, next) {
        const { productId } = req.params
        const cartItem = await Cart.find(req.params.id)
        res.status(200).json('Remove product from cart successfully')

    }
    
    // [Delete] user/:id
    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params.id)
            res.status(200).json('delete thanh cong')
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new userController