const DonerModel = require('./doner.model');
class Doner{
    constructor(){}
    list(){
        return DonerModel.find();
    }
    create(payload){
        return DonerModel.create(payload);
    }
    getByid(id){
        return DonerModel.findOne({_id: id});
    }
    delete(id){
        return DonerModel.findByIdAndDelete({_id: id});
    }
    update(id){
        return DonerModel.findOneAndDelete({_id: id},{$set:{name:payload.name,bloodgroup:payload.bloodgroup,contact:payload.contact}});
    }
};
module.exports = new Doner();