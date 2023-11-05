const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSChema = new Schema({
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
    }

})
const Product = mongoose.model('product',productSChema)

module.exports = Product