const router = require('express').Router();
const BookController = require("./book.controller");
router.get('/', async(req, res, next)=> {
    let bookList = await BookController.list();
    res.render("book/index",{
        title: "Book List",
        bookList
    })
})

module.exports = router;