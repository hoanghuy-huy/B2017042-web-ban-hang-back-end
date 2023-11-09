const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSChema = new Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:Number
    }

})
const Customer = mongoose.model('customer',customerSChema)

module.exports = Customer