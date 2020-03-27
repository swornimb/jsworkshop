const mongoose = require ("mongoose");

const BookSchema = mongoose.Schema(
    {
        //properies
    name: {type:String},
    pages: String,
    author: {type: String}
    },
    {
        collection: "book",
        timestamp: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        },
        toObject: {
            virtuals: true
        },
        toJSON:{
            virtuals:true
        }
    }    
);
module.exports = mongoose.model("Book", BookSchema);