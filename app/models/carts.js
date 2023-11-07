const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSChema = new Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    idCustomer:{
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
    color:{
        type:String,
        required:true,
    },
    size:{
        type:Number,
    }

})
const Cart = mongoose.model('cart',cartSChema)

module.exports = Cart