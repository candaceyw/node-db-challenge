exports.seed = async function (knex) {
	await knex('projects').insert([
		{
			project_id: 1,
			project_name: 'Create a chat feature',
			project_description: 'build a chat feature for client to speak to host',
			project_completed: false,
		},
		{
			project_name: 'Update email form',
			project_description: 'update form to include authentication',
			project_completed: false,
		},
		{
			project_name: 'Build a product page',
			project_description: 'build a new product page with shopping cart',
			project_completed: true,
		},
	]);
};
