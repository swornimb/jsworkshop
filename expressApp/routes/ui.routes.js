const router = require("express").Router();
const BookRouter = require("../modules/books/book.routes.ui");


router.use("/", BookRouter);

module.exports = router;
