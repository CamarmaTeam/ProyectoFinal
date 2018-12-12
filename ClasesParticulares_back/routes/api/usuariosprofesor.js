var express = require('express');
var crypto = require('crypto');
const SHA256 = require("crypto-js/sha256");
var router = express.Router();

const usuarioprofesorModel = require('../../models/usuarioprofesor')

// POST http://localhost:3000/api/usuariosprofesor

router.post('/', (req, res) => {
	usuarioprofesorModel.insert(req.body, (err, result) => {
		if (err) return res.json ({ error: err.message})
		res.json(result.insertId)
	})
})

// POST http://localhost:3000/api/usuariosprofesor/modificar

router.post('/modificar/:idUser', (req, res) => {
	usuarioprofesorModel.modifyById(req.params.idUser, req.body, (err, result) => {
		console.log(req.body)
		if (err) return res.json ({ error: err.message})
		res.json(result)
	})
})

// GET http://localhost:3000/api/usuariosprofesor/5

router.get('/:idUser', (req, res) => {
	usuarioprofesorModel.getById(req.params.idUser, (err, rows) => {
		if (err) return res.json ({ error: err.message})
		res.json(rows)
	})
})

// GET http://localhost:3000/api/usuariosprofesor/token/5jdaos5da

router.get('/token/:token', (req, res) => {
	usuarioprofesorModel.getByToken(req.params.token, (err, rows) => {
		if (err) return res.json ({ error: err.message})
		res.json(rows)
	})
})

// POST http://localhost:3000/api/usuariosprofesor/login

router.post('/login', (req, res) => {
	let email = req.body.email
	usuarioprofesorModel.login(email, (err, rows) => {
		if (err) return res.json({error: err.message})
		if (rows.length === 0) return res.json ({error: 'El email y/o la contraseña son incorrectos'})
		if (rows[0].contrasena !== SHA256(req.body.contrasena).toString()) return res.json({error: 'El email y/o la contraseña son incorrectos'})
		crypto.randomBytes(6, function(err, buffer) {
  			let tokenG = buffer.toString('hex')
			usuarioprofesorModel.insertToken(tokenG, email, (err, result) => {
				if (err) return res.json ({ error: err.message})
				res.json({token: tokenG})
			})
  			
		});
		
	})

})

module.exports = router;