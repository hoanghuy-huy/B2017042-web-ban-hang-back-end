const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSChema = new Schema({
    id:{
        type:String,
        unique:true,
        required:true,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type:Number,
        required:true
    },
    description: {
        type:String,
    },
    category: {
        type:String,
        required:true,
    },
    note:{
        type:String,
    },
    imageUrl:{
        type:String,
    },
    averageRating:{
        type:Number,
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
const Product = mongoose.model('product',productSChema)

module.exports = Product