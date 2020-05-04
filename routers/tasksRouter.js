const express = require('express');
const {
	getTaskList,
	insertTask,
	removeTask,
} = require('../data/helpers/taskHelpers');
const router = express.Router();

// GET all tasks
router.get('/', async (req, res, next) => {
	try {
		const list = await getTaskList();
		res.status(200).json(list);
	} catch (error) {
		next(error);
	}
});

// POST adding tasks.
router.post('/', async (req, res, next) => {
	try {
		const data = await insertTask(req.body);
		res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

// DELETE task
router.delete('/:id', async (req, res, next) => {
	try {
		await removeTask(req.params.id);
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});
module.exports = router;
