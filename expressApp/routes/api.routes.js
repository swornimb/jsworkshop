const router = require('express').Router();

const bookRouter = require('../modules/books/book.routes.api');

router.use('/book', bookRouter);

module.exports = router;




