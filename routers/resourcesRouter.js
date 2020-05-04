const express = require('express');
const {
	getResources,
	insertResource,
} = require('../data/helpers/resourceHelpers');

const router = express.Router();

// GET  retrieving a list of resources.

router.get('/', async (req, res, next) => {
	try {
		const list = await getResources();
		res.status(200).json(list);
	} catch (error) {
		next(error);
	}
});

// POST adding resources.
router.post('/', async (req, res, next) => {
	try {
		const data = await insertResource(req.body);
		res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});
module.exports = router;
