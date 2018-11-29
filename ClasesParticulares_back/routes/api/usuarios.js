var express = require('express');
var router = express.Router();

const usuarioModel = require('../../models/usuario')

// POST http://localhost:3000/api/usuarios

router.post('/', (req, res) => {
	usuarioModel.insert(req.body, (err, result) => {
		if (err) return res.json ({ error: err.message})
		res.json(result.insertId)
	})
})

module.exports = router;