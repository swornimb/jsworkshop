const BookModel = require("./book.model.js");
class Book{
    constructor(){}
    list(){
        return BookModel.find()
    }
    create(payload){
        return BookModel.create(payload);
    }
    update(id,payload){
        return BookModel.findOneAndUpdate({_id:id},{$set:{name:payload.name, pages:payload.pages, author: payload.author }}) 
    }
    getByID(id){
        return BookModel.findOne({_id: id})
    }
    remove(id){
        return BookModel.findByIdAndDelete({_id: id})
    }
}

module.exports = new Book();