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
        required:true,
    },
    idProduct:{
        type:String,
        required:true,
    },  
    quantity:{
        type:Number,
    },
    idColor:{
        type:String,
        required:true,
    },
    idSize:{
        type:String,
    }

})
const Cart = mongoose.model('cart',cartSChema)

module.exports = Cart