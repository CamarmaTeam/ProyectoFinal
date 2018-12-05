var express = require('express');
var crypto = require('crypto');
const SHA256 = require("crypto-js/sha256");
var router = express.Router();

const usuarioModel = require('../../models/usuario')

// POST http://localhost:3000/api/usuarios

router.post('/', (req, res) => {
	usuarioModel.insert(req.body, (err, result) => {
		if (err) return res.json ({ error: err.message})
		res.json(result.insertId)
	})
})

// POST http://localhost:3000/api/usuarios/modificar

router.post('/modificar/:idUser', (req, res) => {
	usuarioModel.modifyById(req.params.idUser, req.body, (err, result) => {
		if (err) return res.json ({ error: err.message})
		res.json(result)
	})
})

// GET http://localhost:3000/api/usuarios/5

router.get('/:idUser', (req, res) => {
	usuarioModel.getById(req.params.idUser, (err, rows) => {
		if (err) return res.json ({ error: err.message})
		res.json(rows)
	})
})

// GET http://localhost:3000/api/usuarios/token/5jdaos5da

router.get('/token/:token', (req, res) => {
	usuarioModel.getByToken(req.params.token, (err, rows) => {
		if (err) return res.json ({ error: err.message})
		res.json(rows)
	})
})

// POST http://localhost:3000/api/usuarios/login

router.post('/login', (req, res) => {
	let email = req.body.email
	usuarioModel.login(email, (err, rows) => {
		if (err) return res.json({error: err.message})
		if (rows.length === 0) return res.json ({error: 'El email y/o la contraseña son incorrectos'})
		if (rows[0].contrasena !== SHA256(req.body.contrasena).toString()) return res.json({error: 'El email y/o la contraseña son incorrectos'})
		crypto.randomBytes(12, function(err, buffer) {
			let tokenG = buffer.toString('hex')
			usuarioModel.insertToken(tokenG, email, (err, result) => {
				if (err) return res.json ({ error: err.message})
				res.json({token: tokenG})
			})
  			
		});
		
	})

})

module.exports = router;