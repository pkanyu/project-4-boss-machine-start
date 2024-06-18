const express = require("express");
const workRouter = express.Router({ mergeParams: true });
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

// GET /api/minions/:minionId/work to get an array of all work for the specified minion
workRouter.get("/", (req, res) => {
  const allWork = getAllFromDatabase("work").filter(
    (work) => work.minionId === req.params.minionId
  );
  res.send(allWork);
});

// POST /api/minions/:minionId/work to create a new work object and save it to the database
workRouter.post("/", (req, res) => {
  const newWork = req.body;
  newWork.minionId = req.params.minionId;
  const addedWork = addToDatabase("work", newWork);
  res.status(201).send(addedWork);
});

// PUT /api/minions/:minionId/work/:workId to update a single work by id
workRouter.put("/:workId", (req, res) => {
  const updatedWork = req.body;
  updatedWork.id = req.params.workId;
  updatedWork.minionId = req.params.minionId;
  const work = updateInstanceInDatabase("work", updatedWork);
  if (work) {
    res.send(work);
  } else {
    res.status(404).send();
  }
});

// DELETE /api/minions/:minionId/work/:workId to delete a single work by id
workRouter.delete("/:workId", (req, res) => {
  const deleted = deleteFromDatabasebyId("work", req.params.workId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = workRouter;
