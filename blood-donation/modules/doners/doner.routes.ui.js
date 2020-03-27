const router = require('express').Router();
const DonerController = require('./doner.controller');
router.get('/' ,async(req, res, next)=>{
    let DonerList = await DonerController.list();
    res.render('doner/index',{
        DonerList
    })
})
module.exports = router;