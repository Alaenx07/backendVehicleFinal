const mongoose = require('mongoose')

const UserSchema  = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        min:3,
        max:20,
        unique: true // don't want to have duplicate username
    },
    email:{
        type: String, 
        required: true,
        max:50,
        unique: true // don't want to have duplicate email

    },
    password:{
        type: String, 
        require: true,
        min: 6
    }
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema);