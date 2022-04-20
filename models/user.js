// schema for user registration and login   
const mongoose = require('mongoose')

const userSchema= mongoose.Schema({
    email : {type: String, required: true, unique:true},
    password : {type: String, required: true},
    username : {type:String, required: true, unique: true}
    // login : {type: Boolean, default:false}
})

// creating a module for exporting
const model = mongoose.model('users', userSchema)

// exporting the module to auth.js in controller
module.exports = model