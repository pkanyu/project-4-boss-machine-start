const express = require("express");
const minionsRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
const validateId = require("./validateId"); // Add this line
const workRouter = require("./work");

// GET /api/minions to get an array of all minions
minionsRouter.get("/", (req, res) => {
  const allMinions = getAllFromDatabase("minions");
  res.send(allMinions);
});

// POST /api/minions to create a new minion and save it to the database
minionsRouter.post("/", (req, res) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

// GET /api/minions/:minionId to get a single minion by id
minionsRouter.get("/:minionId", validateId, (req, res, next) => {
  const minion = getFromDatabaseById("minions", req.params.minionId);
  if (minion) {
    res.send(minion);
  } else {
    res.status(404).send();
  }
});

// PUT /api/minions/:minionId to update a single minion by id
minionsRouter.put("/:minionId", validateId, (req, res) => {
  const updatedMinion = updateInstanceInDatabase("minions", req.body);
  res.send(updatedMinion);
});

// DELETE /api/minions/:minionId to delete a single minion by id
minionsRouter.delete("/:minionId", validateId, (req, res) => {
  const deleted = deleteFromDatabasebyId("minions", req.params.minionId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// Use the work router for /api/minions/:minionId/work routes
minionsRouter.use("/:minionId/work", workRouter);

module.exports = minionsRouter;
