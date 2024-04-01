const { getAsteroidsInPeriod } = require("../repositories/asteroidsRepository");
const { formatAsteroidData } = require("../utils/asteroidUtils");

const getAsteroidsHandler = async (getStartDate, req, res) => {
  try {
    const asteroidsData = await getAsteroidsInPeriod(getStartDate);
    const formattedAsteroids =
      asteroidsData.near_earth_objects[getStartDate()].map(formatAsteroidData);
    res.json(formattedAsteroids);
  } catch (error) {
    console.error("Error fetching asteroids data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAsteroidsHandler };
