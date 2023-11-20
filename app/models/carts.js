const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSChema = new Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    idUser:{
        type:String,
    },
    idProduct:{
        type:String,
    },  
    nameProduct:{
        type:String,
    }, 
    priceProduct:{
        type:Number,
    }, 
    imageUrl:{
        type:String,
    },
    averageRatingProduct:{
        type:Number,
    }


})
const Cart = mongoose.model('cart',cartSChema)

module.exports = Cart