const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name:{type:String,
    required:true},
    mailid:{type:String,
    required:true},
    phone:{type:Number,
        required:true},
    question:[{type:String}],  
    fake:{type:String,
        required:true
    },  
    date:{type:Date,
    default:Date.now()}
});

module.exports = mongoose.model("tutoromp",userschema);