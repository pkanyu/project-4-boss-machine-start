function checkMillionDollarIdea(req, res, next) {
  const { numWeeks, weeklyRevenue } = req.body;

  if (!numWeeks || !weeklyRevenue || isNaN(numWeeks) || isNaN(weeklyRevenue)) {
    return res.status(400).send("Invalid input");
  }

  const totalValue = Number(numWeeks) * Number(weeklyRevenue);

  if (totalValue < 1000000) {
    return res
      .status(400)
      .send("Idea is not worth at least one million dollars");
  }

  next();
}

module.exports = checkMillionDollarIdea;
