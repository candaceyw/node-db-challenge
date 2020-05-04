const express = require('express');
const helmet = require('helmet');
const projectsRouter = require('./routers/projectsRouter');
const resourcesRouter = require('./routers/resourcesRouter');
const tasksRouter = require('./routers/tasksRouter');

const server = express();
const port = 5500;

server.use(helmet());
server.use(express.json());

server.use('/projects', projectsRouter);
server.use('/resources', resourcesRouter);
server.use('/tasks', tasksRouter);

server.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({
		message: 'Something went wrong',
	});
});

server.get('/', (req, res) => {
	res.status(200).json('Success');
});

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`);
});
