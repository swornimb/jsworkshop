var express = require('express');
var router = express.Router();

/* GET home page. */
const donerRouter = require('../modules/doners/doner.routes.api');
router.use('/doner',donerRouter);
  
module.exports = router;