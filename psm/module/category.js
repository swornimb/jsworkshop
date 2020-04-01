const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/psm',{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true});
var conn = mongoose.Collection;
const catSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true,
        
        index:{
            unique:true,
        }
    },
    date:{
        type: Date,
        default: Date.now
    }
})

var passcatModel= mongoose.model ('category', catSchema);
module.exports=passcatModel;