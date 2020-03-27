const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/psm',{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true});
var conn = mongoose.Collection;
const passSchema = new mongoose.Schema({
    appname:{
        type:String,
        required:true,
        
        index:{
            unique:true,
        }
    },
    appusername:{
        type:String,
        required:true,
        
        index:{
            unique:true,
        }
        
    },
    apppassword:{
        type:String,
        required:true,        
    },
    date:{
        type: Date,
        default: Date.now
    }
})

var passModel= mongoose.model ('password', passSchema);
module.exports=passModel;