const { getFromDatabaseById } = require("./db");

const validateId = (req, res, next) => {
  const { minionId, ideaId, workId } = req.params;
  const validIdPattern = /^[0-9]+$/; // Pattern to match numeric IDs

  if (
    (minionId && !validIdPattern.test(minionId)) ||
    (ideaId && !validIdPattern.test(ideaId)) ||
    (workId && !validIdPattern.test(workId))
  ) {
    return res.status(404).send("ID is invalid");
  }

  if (minionId && !getFromDatabaseById("minions", minionId)) {
    return res.status(404).send("ID not found");
  }
  if (ideaId && !getFromDatabaseById("ideas", ideaId)) {
    return res.status(404).send("ID not found");
  }
  if (workId && !getFromDatabaseById("work", workId)) {
    return res.status(404).send("ID not found");
  }

  next();
};

module.exports = validateId;
