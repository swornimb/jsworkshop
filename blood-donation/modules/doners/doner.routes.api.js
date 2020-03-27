const router = require('express').Router();
const DonerController  = require('./doner.controller');

//list

router.get('/', (req, res, next)=>{
    DonerController.list()
    .then(d=> res.json(d))
    .catch(error => next(error));
})
//create
router.post('/',(req,res,next)=>{
    DonerController.create(req.body)
    .then(d=>res.json(d))
    .catch(error => next(error));
})
//get by id
router.get('/:id',(req,res,next)=>{
    DonerController.getByid(req.params.id)
    .then(d=>res.json(d))
    .catch(error => next(error));
})
//delete
router.get('/:id',(req,res,next)=>{
    DonerController.remove(req.params.id)
    .then(d=>res.json(d))
    .catch(error => next(error));
})
//update
router.get('/:id',(req,res,next)=>{
    DonerController.update(req.params.id, req.body)
    .then(d=>res.json(d))
    .catch(error => next(error));
})
module.exports = router;