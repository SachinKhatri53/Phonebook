const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
    photo:{
        type:String
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    company:{
        type: String
    },
    phonenumber:{
        type: String,
        required: true
    },
    email:{
        type: String
    },
    address:{
        type: String
    },
});



module.exports = mongoose.model('phones', PhoneSchema);