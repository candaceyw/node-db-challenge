exports.seed = async function (knex) {
	await knex('resources').insert([
		{
			resource_name: 'Macbook Pro',
			resource_description: 'all about the macbook pro',
		},
		{
			resource_name: 'Apple IPad ',
			resource_description: 'and ipad',
		},
		{
			resource_name: 'Android Tablet',
			resource_description: 'lovely android tablet',
		},
	]);
};
