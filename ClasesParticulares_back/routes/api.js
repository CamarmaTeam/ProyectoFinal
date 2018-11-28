var express = require('express');
var router = express.Router();

const clasesApiRouter = require('./api/clases')

router.use('/clases', clasesApiRouter)

module.exports = router;