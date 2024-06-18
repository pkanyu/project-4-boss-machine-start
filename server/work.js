const express = require("express");
const workRouter = express.Router({ mergeParams: true });
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
const validateId = require("./validateId");

// GET /api/minions/:minionId/work to get an array of all work for the specified minion
workRouter.get("/", validateId, (req, res) => {
  const allWork = getAllFromDatabase("work").filter(
    (work) => work.minionId === req.params.minionId
  );
  res.send(allWork);
});

// POST /api/minions/:minionId/work to create a new work object and save it to the database
workRouter.post("/", validateId, (req, res) => {
  const newWork = req.body;
  newWork.minionId = req.params.minionId;
  const addedWork = addToDatabase("work", newWork);
  res.status(201).send(addedWork);
});

// PUT /api/minions/:minionId/work/:workId to update a single work by id
workRouter.put("/:workId", validateId, (req, res) => {
  const updatedWork = req.body;
  updatedWork.id = req.params.workId;
  updatedWork.minionId = req.params.minionId;

  // Check if the work item is associated with the correct minion
  const existingWork = getFromDatabaseById("work", req.params.workId);
  if (!existingWork || existingWork.minionId !== req.params.minionId) {
    return res.status(400).send("Work ID does not match minion ID");
  }

  const work = updateInstanceInDatabase("work", updatedWork);
  if (work) {
    res.send(work);
  } else {
    res.status(404).send();
  }
});

// DELETE /api/minions/:minionId/work/:workId to delete a single work by id
workRouter.delete("/:workId", validateId, (req, res) => {
  const deleted = deleteFromDatabasebyId("work", req.params.workId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = workRouter;
