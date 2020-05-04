exports.seed = async function (knex) {
	await knex('tasks').insert([
		{
			project_id: 1,
			task_description: 'create a form',
			notes: 'form should be built responsive',
			task_completed: false,
		},
		{
			project_id: 1,
			task_description: 'test database',
			notes: 'test database holding husers',
			task_completed: true,
		},
		{
			project_id: 2,
			task_description: 'test form',
			notes: 'test form authentication',
			task_completed: false,
		},
		{
			project_id: 3,
			task_description: 'Test shopping cart',
			notes: 'make sure shopping cart is loading correctly',
			task_completed: true,
		},
	]);
};
