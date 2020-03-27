const mongoose = require ('mongoose');
const DonerSchema = mongoose.Schema(
    {
        name: String,
        bloodgroup: String,
        contact: String,
        
    },
    {
        collection: "doner",
        timestamp:{
            createdAt: "created_at",
            updatedAt: "updated_at"
        },
        toObject: {
            virtuals: true
        },
        toJson:{
            virtuals:true
        }     
    }
);
module.exports=mongoose.model('Doner',DonerSchema );