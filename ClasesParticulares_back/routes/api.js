var express = require('express');
var router = express.Router();

const clasesApiRouter = require('./api/clases')
const usuariosApiRouter = require('./api/usuarios')
const usuariosprofesorApiRouter = require('./api/usuariosprofesor')
const valoracionesApiRouter = require('./api/valoraciones')

router.use('/clases', clasesApiRouter)
router.use('/usuarios', usuariosApiRouter)
router.use('/usuariosprofesor', usuariosprofesorApiRouter)
router.use('/valoraciones', valoracionesApiRouter)

module.exports = router;