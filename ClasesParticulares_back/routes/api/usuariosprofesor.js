var express = require('express');
var router = express.Router();

const usuarioprofesorModel = require('../../models/usuarioprofesor')

// POST http://localhost:3000/api/usuariosprofesor

router.post('/', (req, res) => {
	usuarioprofesorModel.insert(req.body, (err, result) => {
		if (err) return res.json ({ error: err.message})
		res.json(result.insertId)
	})
})

module.exports = router;