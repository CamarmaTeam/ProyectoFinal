const db = require('../db')

exports.insert = ({fk_usuario, fk_usuarioprofesor, texto, puntuacion, anonima}, done) => {
	db.get().query('INSERT INTO valoraciones VALUES (null, ?, ?, ?, ?, ?)', [fk_usuario, fk_usuarioprofesor, texto, puntuacion, anonima], (err, result) => {
		if(err) return done(err, null)
		done(null, result)
	})
}

exports.getByFkUsuarioProfesor = (fk_usuarioprofesor, done) => {
	db.get().query('SELECT * FROM valoraciones WHERE fk_usuarioprofesor=?', [fk_usuarioprofesor], (err, rows) => {
		if(err) return done(err, null)
			done(null, rows)
	})
}

