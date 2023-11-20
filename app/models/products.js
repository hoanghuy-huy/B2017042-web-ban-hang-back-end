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
    },
    price: {
        type:Number,
    },
    description: {
        type:String,
    },
    category: {
        type:String,
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


})
const Product = mongoose.model('product',productSChema)

module.exports = Product