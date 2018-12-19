var express = require('express');
var router = express.Router();

const valoracionModel = require('../../models/valoracion')

// GET http://localhost:3000/api/valoraciones/1

router.get ('/:fkusuarioprofesor', (req, res) => {
	valoracionModel.getByFkUsuarioProfesor(req.params.fkusuarioprofesor, (err, rows) => {
		if (err) return res.json ({error: err.message})
			res.json(rows)
	})
})

// POST http://localhost:3000/api/valoraciones

router.post('', (req, res) => {
	valoracionModel.insert(req.body, (err, result) => {
		if (err) return res.json ({error: err.message})
		res.json(result.insertId)
	})
})

module.exports = router;