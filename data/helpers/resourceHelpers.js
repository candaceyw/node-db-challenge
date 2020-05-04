const db = require('../config');

module.exports = {
	getResources,
	insertResource,
	findResourceById,
};

// retrieving a list of resources.
function getResources() {
	return db('resources');
}

//  adding resources.
function insertResource(resource) {
	return db('resources')
		.insert(resource, 'id')
		.then(([id]) => getResources(id));
}

function findResourceById(id) {
	return db('resources')
		.first()
		.then((res) => {
			if (res !== []) {
				return res;
			} else {
				return null;
			}
		});
}
