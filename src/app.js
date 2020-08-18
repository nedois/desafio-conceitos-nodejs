const express = require("express");
const cors = require("cors");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
	return response.json(repositories);
});

app.post("/repositories", (request, response) => {
	const { title, url, techs } = request.body;

	repository = {
		id: uuid(),
		title,
		url,
		techs,
		likes: 0,
	};

	repositories.push(repository);

	return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
	const { id } = request.params;
	const { title, url, techs } = request.body;

	const repositoryIndex = repositories.findIndex(
		(repository) => repository.id === id
	);

	if (repositoryIndex < 0) {
		return response.status(400).json({ error: "Invalid repository ID" });
	}

	const repository = {
		...repositories[repositoryIndex],
		...(title && { title }),
		...(url && { url }),
		...(techs && { techs }),
	};

	repositories[repositoryIndex] = repository;

	return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
	const { id } = request.params;

	const repositoryIndex = repositories.findIndex(
		(repository) => repository.id === id
	);

	if (repositoryIndex < 0) {
		return response.status(400).json({ error: "Invalid repository ID" });
	}

	repositories.splice(repositoryIndex, 1);

	return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
	const { id } = request.params;

	const repositoryIndex = repositories.findIndex(
		(repository) => repository.id === id
	);

	if (repositoryIndex < 0) {
		return response.status(400).json({ error: "Invalid repository ID" });
	}

	repositories[repositoryIndex].likes += 1;

	return response.json(repositories[repositoryIndex]);
});

module.exports = app;
