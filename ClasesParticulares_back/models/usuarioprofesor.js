const db = require('../db');
const SHA256 = require("crypto-js/sha256");

exports.insert = ({nombre, apellidos, foto, ciudad, provincia, contrasena, email, telefono, biografia}, done) => {
	db.get().query('INSERT INTO usuarioprofesor VALUES (null, ?, ?, ?, ?, ?, ?, null, ?, ?, ?)', [nombre, apellidos, foto, ciudad, provincia, SHA256(contrasena).toString(), email, telefono, biografia], (err, result) => {
		if(err) return done(err, null)
		done(null, result)
	})
}

exports.modifyById = (idUser, {nombre, apellidos, foto, ciudad, provincia, contrasena, email, telefono, biografia}, done) => {
	db.get().query('UPDATE usuarioprofesor SET nombre=?, apellidos=?, foto=?, ciudad=?, provincia=?, contrasena=?, email=?, telefono=?, biografia=? where id=?', [nombre, apellidos, foto, ciudad, provincia, contrasena, email, telefono, biografia, idUser], (err, result) => {
		if(err) return done(err, null)
		done(null, result)
	})
}

exports.getById = (idUser, done) => {
	db.get().query('SELECT * FROM usuarioprofesor WHERE id=?', [idUser], (err, rows) => {
		if(err) return done(err, null) 
		done(null, rows)
	})
}

exports.getByToken = (token, done) => {
	db.get().query('SELECT * FROM usuarioprofesor WHERE id=( SELECT id FROM usuarioprofesor WHERE token=?)', [token], (err, rows) => {
		if(err) return done(err, null) 
		done(null, rows)
	})
}

exports.login = (email, done) => {
	db.get().query('SELECT * FROM usuarioprofesor WHERE email=?', [email], (err, rows) => {
		if(err) return (err, null)
		done(null, rows)
	})

}

exports.insertToken = (token, email, done) => {
	db.get().query('UPDATE usuarioprofesor SET token=? WHERE email=?', [token, email], (err, result) => {
		if(err) return (err, null)
		done(null, result)
	})
}
