const router = require('express').Router();
const BookController = require('./book.controller');
// list
router.get('/',(req, res, next)=>{
    BookController.list()
    .then(d => res.json(d))
    .catch(error=>next(error));
})
// create
router.post('/',(req, res, next)=>{
    BookController.create(req.body)
    .then(d => {
        res.redirect("/"),
        res.json(d);
    })
    .catch(error=>next(error));
})
//getbyid
router.get('/:id',(req, res, next)=>{
    BookController.getByID(req.params.id)
    .then(d => res.json(d))
    .catch(error=>next(error));
})
//remove
router.delete('/:id',(req, res, next)=>{
    BookController.remove(req.params.id)
    .then(d => res.json(d))
    .catch(error=>next(error));
})
//update
router.put('/:id',(req, res, next)=>{
    BookController.update(req.params.id, req.body)
    .then(d => res.json(d))
    .catch(error=>next(error));
})
module.exports =  router;