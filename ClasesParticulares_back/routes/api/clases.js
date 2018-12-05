var express = require('express');
var router = express.Router();

const claseModel = require('../../models/clase')

// GET http://localhost:3000/api/clases/
router.get('/', (req, res) => {
	claseModel.getAll((err, rows) => {
		if(err) return res.json({error: err.message })
		res.json(rows)
	})
})

// GET http://localhost:3000/api/clases/idprofesor
router.get ('/:fkusuarioprofesor', (req, res) => {
	claseModel.getByFkUsuarioProfesor(req.params.fkusuarioprofesor, (err, rows) => {
		if (err) return res.json ({error: err.message})
			res.json(rows)
	})
})

// GET http://localhost:3000/api/clases/delete/idclaseborrar
router.get ('/delete/:idClase', (req, res) => {
	claseModel.deleteById(req.params.idClase, (err, rows) => {
		if (err) return res.json ({error: err.message})
			res.json(rows)
	})
})


// POST http://localhost:3000/api/clases/

router.post('/', (req, res) => {
	claseModel.insert(req.body, (err, result) => {
		if (err) return res.json ({ error: err.message})
		res.json(result.insertId)
	})
})

// POST http://localhost:3000/api/clases/modificar/idClass

router.post('/modificar/:idClass', (req, res) => {
	claseModel.modifyClass(req.params.idClass, req.body, (err, result) => {
		if (err) return res.json ({ error: err.message})
		res.json(result)
	})
})

module.exports = router;