const mysql = require('mysql')

let pool = null

exports.connect = (done) => {
	pool = mysql.createPool({
		host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'clasesparticulares',
        port: 8889
	})
	if (pool !== null) {
		console.log('Conectados a la DB')
		done(null)
	} else {
		done('Problema conexión con DATABASE')
	}
}

exports.get = () => {
    return pool
}