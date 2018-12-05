const db = require('../db')
const SHA256 = require("crypto-js/sha256");

exports.insert = ({nombre, apellidos, foto, ciudad, provincia, contrasena, email, telefono}, done) => {
	db.get().query('INSERT INTO usuario VALUES (null, ?, ?, ?, ?, ?, ?, null, ?, ?)', [nombre, apellidos, foto, ciudad, provincia, SHA256(contrasena).toString(), email, telefono], (err, result) => {
		if(err) return done(err, null)
		done(null, result)
	})
}

exports.modifyById = (idUser, {nombre, apellidos, foto, ciudad, provincia, contrasena, email, telefono}, done) => {
	db.get().query('UPDATE usuario SET nombre=?, apellidos=?, foto=?, ciudad=?, provincia=?, contrasena=?, email=?, telefono=? where id=?', [nombre, apellidos, foto, ciudad, provincia, contrasena, email, telefono, idUser], (err, result) => {
		if(err) return done(err, null)
		done(null, result)
	})
}

exports.getById = (idUser, done) => {
	db.get().query('SELECT * FROM usuario WHERE id=?', [idUser], (err, rows) => {
		if(err) return done(err, null) 
		done(null, rows)
	})
}

exports.getByToken = (token, done) => {
	db.get().query('SELECT * FROM usuario WHERE id=( SELECT id FROM usuario WHERE token=?)', [token], (err, rows) => {
		if(err) return done(err, null) 
		done(null, rows)
	})
}

exports.login = (email, done) => {
	db.get().query('SELECT * FROM usuario WHERE email=?', [email], (err, rows) => {
		if(err) return (err, null)
		done(null, rows)
	})
}

exports.insertToken = (token, email, done) => {
	db.get().query('UPDATE usuario SET token=? WHERE email=?', [token, email], (err, result) => {
		if(err) return (err, null)
		done(null, result)
	})
}





