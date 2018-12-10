const db = require('../db')

exports.getAll = (done) => {
	db.get().query('SELECT * FROM clases', (err, rows) => {
		if(err) return done(err, null)
		done(null, rows)
	})
}

exports.getByFkUsuarioProfesor = (fk_usuarioprofesor, done) => {
	db.get().query('SELECT * FROM clases WHERE fk_usuarioprofesor=?', [fk_usuarioprofesor], (err, rows) => {
		if(err) return done(err, null)
			done(null, rows)
	})
}

exports.insert = ({fk_usuarioprofesor, nombreclase, rama, descripcion, nivel, foto, ciudad, provincia, clasein, claseout, claseciudad, clasefueraciudad }, done) => {
	db.get().query('INSERT INTO clases VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [fk_usuarioprofesor, nombreclase, rama, descripcion, nivel, foto, ciudad, provincia, clasein, claseout, claseciudad, clasefueraciudad], (err, result) => {
		if(err) return done(err, null)
		done(null, result)
	})
}

exports.deleteById = (id, done) => {
	db.get().query('DELETE FROM clases WHERE id=?', [id], (err, rows) => {
		if(err) return done(err, null)
		done(null, rows)
	})
}

exports.modifyClass= (idClase, {nombreclase, rama, descripcion, nivel, foto, ciudad, provincia, clasein, claseout}, done) => {
	db.get().query('UPDATE clases SET nombreclase=?, rama=?, descripcion=?, nivel=?, foto=?, ciudad=?, provincia=?, clasein=?, claseout=? where id=?', [nombreclase, rama, descripcion, nivel, foto, ciudad, provincia, clasein, claseout, idClase], (err, result) => {
		if(err) return done(err, null)
		done(null, result)
	})
}