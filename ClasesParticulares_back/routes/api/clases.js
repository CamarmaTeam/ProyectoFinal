var express = require('express');
var router = express.Router();

const claseModel = require('../../models/clase')

// GET http://localhost:3000/api/clases/
router.get('/', (req, res) => {
	claseModel.getAll((err, rows) => {
		if(err) return res.json({error: err.message })
		res.json(rows)
	})
})

// POST http://localhost:3000/api/clases/filter

// POST http://localhost:3000/api/clases/



module.exports = router;