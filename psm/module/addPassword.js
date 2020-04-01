const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/psm',{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true});
var conn = mongoose.Collection;
const addPassSchema = new mongoose.Schema({
    password_category:{
        type:String,
        required:true,

    },
    project:{
        type:String,
        required:true,  
    },
    password_details:{
        type:String,
        required:true,

    },
    date:{
        type: Date,
        default: Date.now
    }
})

var passModel= mongoose.model ('password Details', addPassSchema);
module.exports=passModel;