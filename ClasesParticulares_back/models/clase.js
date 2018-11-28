const db = require('../db')

exports.getAll = (done) => {
	db.get().query('SELECT * FROM clases', (err, rows) => {
		if(err) return done(err, null)
		done(null, rows)
	})
}