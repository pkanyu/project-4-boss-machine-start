const express = require("express");
const meetingsRouter = express.Router();
const {
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
  createMeeting,
} = require("./db");

// GET /api/meetings to get an array of all meetings
meetingsRouter.get("/", (req, res) => {
  const allMeetings = getAllFromDatabase("meetings");
  res.send(allMeetings);
});

// POST /api/meetings to create a new meeting and save it to the database
meetingsRouter.post("/", (req, res) => {
  const newMeeting = addToDatabase("meetings", createMeeting());
  res.status(201).send(newMeeting);
});

// DELETE /api/meetings to delete all meetings from the database
meetingsRouter.delete("/", (req, res) => {
  const deleted = deleteAllFromDatabase("meetings");
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

module.exports = meetingsRouter;
