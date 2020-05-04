const db = require('../config');

module.exports = {
	getProjects,
	insertProject,
	findProjectById,
	getProjectTasks,
	removeProject,
	updateProject,
};

//  retrieving a list of projects.
function getProjects() {
	return db('projects');
}

// adding projects.
function insertProject(project) {
	return db('projects')
		.insert(project, 'id')
		.then(([id]) => getProjects(id));
}

//  retrieving a project by id
function findProjectById(project_id) {
	return db('projects as p').where({ 'p.id': project_id }).first();
}

//  retrieving a project and tasks
function getProjectTasks() {
	return db('projects')
		.join('proj_tasks')
		.join('projects as p', 'p.id', 'proj_tasks.project_id')
		.join('tasks as t', 't.id', 'proj_tasks.task_id')

		.select(
			'p.project_name',
			'p.project_description',
			't.task_description',
			't.notes',
			't.task_completed'
		);
}

// PUT  update project
function updateProject(id, changes) {
	return db('projects').where({ id }).update(changes);
}

// DELETE project
function removeProject(id) {
	return db('projects').where({ id }).delete();
}
