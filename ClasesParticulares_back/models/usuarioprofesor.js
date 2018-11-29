const db = require('../db')

exports.insert = ({nombre, apellidos, foto, ciudad, provincia, contrasena, email, telefono, clasesencasa, clasesfueracasa, distanciaclases, biografia}, done) => {
	db.get().query('INSERT INTO usuarioprofesor VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellidos, foto, ciudad, provincia, contrasena, email, telefono, parseInt(clasesencasa), parseInt(clasesfueracasa), parseInt(distanciaclases), biografia], (err, rows) => {
		if(err) return done(err, null)
		done(null, rows)
	})
}

