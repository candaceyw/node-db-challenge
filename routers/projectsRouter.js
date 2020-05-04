const express = require('express');
const {
	getProjects,
	insertProject,
	findProjectById,
	updateProject,
	removeProject,
} = require('../data/helpers/projectHelpers');
const {
	findTaskById,
	taskByProjectId,
} = require('../data/helpers/taskHelpers');
const { findResourceById } = require('../data/helpers/resourceHelpers');

const router = express.Router();

// GET retrieving a list of projects.
router.get('/', async (req, res, next) => {
	try {
		const list = await getProjects();
		res.status(200).json(list);
	} catch (error) {
		next(error);
	}
});

// POST adding projects.
router.post('/', async (req, res, next) => {
	try {
		const data = await insertProject(req.body);
		res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

// GET projects by id including tasks and resources
router.get('/:id', async (req, res, next) => {
	function objectReturn(obj) {
		return { obj };
	}
	const { id } = req.params;

	try {
		const project = await findProjectById(id);

		const tasks = await taskByProjectId(id);
		const convTasks = Object.values(tasks).map((task) => task);
		const resources = objectReturn(await findResourceById(id));
		const convRes = Object.values(resources).map((resource) => resource);

		const data = { project, tasks: convTasks, resources: convRes };

		res.status(200).json(data);
	} catch (err) {
		next(err);
	}
});

// UPDATE project
router.put('/:id', async (req, res, next) => {
	try {
		const data = await updateProject(req.params.id, req.body);
		res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

// DELETE project
router.delete('/:id', async (req, res, next) => {
	try {
		await removeProject(req.params.id);
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

module.exports = router;
