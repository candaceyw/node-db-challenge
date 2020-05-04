exports.up = async function (knex) {
	await knex.schema.createTable('projects', (table) => {
		table.increments('id').unique();
		table.text('project_name').notNullable().unique;
		table.text('project_description');
		table.boolean('project_completed').notNull().defaultTo(false);
	});

	await knex.schema.createTable('resources', (table) => {
		table.increments('id').unique();
		table.text('resource_name').unique().notNullable();
		table.text('resource_description');
	});

	await knex.schema.createTable('tasks', (table) => {
		table.increments('id').unique();
		table.text('task_description').notNullable();
		table.text('notes');
		table.boolean('task_completed').notNull().defaultTo(false);
		table
			.integer('project_id')
			.references('id')
			.inTable('projects')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});

	await knex.schema.createTable('proj_tasks', (table) => {
		table
			.integer('project_id')
			.references('id')
			.inTable('projects')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		table
			.integer('task_id')
			.references('id')
			.inTable('tasks')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists('proj_tasks');
	await knex.schema.dropTableIfExists('tasks');
	await knex.schema.dropTableIfExists('resources');
	await knex.schema.dropTableIfExists('projects');
};
