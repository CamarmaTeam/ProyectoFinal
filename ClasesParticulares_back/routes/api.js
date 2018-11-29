var express = require('express');
var router = express.Router();

const clasesApiRouter = require('./api/clases')
const usuariosApiRouter = require('./api/usuarios')
const usuariosprofesorApiRouter = require('./api/usuariosprofesor')

router.use('/clases', clasesApiRouter)
router.use('/usuarios', usuariosApiRouter)
router.use('/usuariosprofesor', usuariosprofesorApiRouter)

module.exports = router;