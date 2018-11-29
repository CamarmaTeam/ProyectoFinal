const db = require('../db')

exports.insert = ({nombre, apellidos, foto, ciudad, provincia, contrasena, email, telefono}, done) => {
	db.get().query('INSERT INTO usuario VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellidos, foto, ciudad, provincia, contrasena, email, telefono], (err, rows) => {
		if(err) return done(err, null)
		done(null, rows)
	})
}