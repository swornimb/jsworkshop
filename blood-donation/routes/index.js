const router = require('express').Router();

const uiRouter = require('../routes/ui.router');
const apiRouter = require('../routes/api.router');

router.use('/', uiRouter);
router.use('/api/v1', apiRouter);

module.exports = router;
