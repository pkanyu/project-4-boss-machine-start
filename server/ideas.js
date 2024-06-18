const express = require("express");
const ideasRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

// GET /api/ideas to get an array of all ideas
ideasRouter.get("/", (req, res) => {
  const allIdeas = getAllFromDatabase("ideas");
  res.send(allIdeas);
});

// POST /api/ideas to create a new idea and save it to the database
ideasRouter.post("/", (req, res) => {
  const newIdea = addToDatabase("ideas", req.body);
  res.status(201).send(newIdea);
});

// GET /api/ideas/:ideaId to get a single idea by id
ideasRouter.get("/:ideaId", (req, res, next) => {
  const idea = getFromDatabaseById("ideas", req.params.ideaId);
  if (idea) {
    res.send(idea);
  } else {
    res.status(404).send();
  }
});

// PUT /api/ideas/:ideaId to update a single idea by id
ideasRouter.put("/:ideaId", (req, res) => {
  const updatedIdea = updateInstanceInDatabase("ideas", req.body);
  res.send(updatedIdea);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id
ideasRouter.delete("/:ideaId", (req, res) => {
  const deleted = deleteFromDatabasebyId("ideas", req.params.ideaId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;
