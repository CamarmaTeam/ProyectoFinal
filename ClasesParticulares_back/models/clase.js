const db = require('../db')

exports.getAll = (done) => {
	db.get().query('SELECT * FROM clases', (err, rows) => {
		if(err) return done(err, null)
		done(null, rows)
	})
}

exports.insert = ({fk_usuarioprofesor, nombreclase, rama, descripcion, nivel, foto, ciudad, provincia, clasein, claseout}, done) => {
	db.get().query('INSERT INTO clases VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [fk_usuarioprofesor, nombreclase, rama, descripcion, nivel, foto, ciudad, provincia, clasein, claseout], (err, rows) => {
		if(err) return done(err, null)
		done(null, rows)
	})
}