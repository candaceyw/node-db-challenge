const db = require('../config');

module.exports = {
	getTaskList,
	insertTask,
	getTasks,
	findTaskById,
	taskByProjectId,
	removeTask,
};

// retrieving a list of resources.
function getTasks() {
	return db('tasks').join('projects as p', 'p.id', 'pt.project_id');
}

//  retrieving a list of tasks.
// The list of tasks should include the project name and project description.
function getTaskList() {
	return db('tasks as t')
		.select(
			't.id',
			't.task_description',
			't.notes',
			't.task_completed',
			db.raw('p.project_name'),
			db.raw('p.project_description')
		)
		.leftJoin('projects as p', 'p.id', 't.project_id');
}

// adding tasks.
function insertTask(task) {
	return db('tasks')
		.insert(task, 'id')
		.then(([id]) => getTaskList(id));
}

// find take by id
function findTaskById(task_id) {
	return db('tasks as t')
		.leftJoin('proj_tasks as pt', 't.id', 'pt.task_id')
		.select(['t.id', 'task_description', 'notes', 'task_completed'])
		.where({ 't.id': task_id });
}

// DELETE task
function removeTask(id) {
	return db('tasks').where({ id }).delete();
}

// returning tasks by projects
function taskByProjectId(project_id) {
	return db('tasks as t')
		.select(['t.id', 't.task_description', 't.notes', 't.task_completed'])
		.leftJoin('projects as p', 'p.id', 't.project_id')
		.where('t.project_id', project_id);
}
