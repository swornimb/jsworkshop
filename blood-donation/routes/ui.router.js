const router = require("express").Router();
const DonerRouter = require("../modules/doners/doner.routes.ui");


router.use("/", DonerRouter);

module.exports = router;