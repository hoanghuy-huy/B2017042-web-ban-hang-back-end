const Product = require('../models/products');
const User = require('../models/user');
const Cart = require('../models/carts');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
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

    // [GET] /api/users/:userId
    async getOneUser(req, res){
        try {
            const {userId} = req.params
            const user = await User.findOne({id:userId})
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    //[GET]  /users/:userId/cart
    async getAllCart(req, res, next) {
        try {
            const {userId} = req.params
            const itemCart = await Cart.find({idUser:userId})
            return res.status(200).json(itemCart)            
        } catch (error) {
            return res.status(500).json({message:'Error internal server'})
        }

    }   
    // [POST] /users/:userId/cart/:productId
    async addToCart(req, res, next) {
        try {
            const {userId, productId} = req.params
            const id = uuidv4();
            const doc = await Product.findOne({id:productId}) 
            if(!doc) return res.status(404).json({message:'Product not found'})
            const itemCart = new Cart({id:id,idUser:userId,idProduct:productId,priceProduct:doc.price,nameProduct:doc.name,averageRatingProduct:doc.averageRating,imageUrl:doc.imageUrl})
            await itemCart.save();
            return res.status(200).json({message:'Added item into cart',itemCart});
        } catch (error) {
            return res.status(404).json('Could not add item into cart')
        }
    }
    
    async removeProductFromCart(req, res, next) {
        const { productId } = req.params
        const cartItem = await Cart.findOneAndDelete({id:productId})
        res.status(200).json({message:'Remove product from cart successfully',cartItem})

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

    async editUser(req, res) {
        try {
            const {userId} = req.params
            const user = await User.findOne({id:userId})
            if(!user) return res.status(404).json({message: 'User not found'})
            const update = await User.findOneAndUpdate({id:userId},req.body)  
            await update.save()
            return res.status(200).json({message : 'update successfully'})
        } catch (error) {
            return res.status(500).json({message:'error server'})
        }

    }

}

module.exports = new userController