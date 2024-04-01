const express = require("express");
const { getAsteroidsHandler } = require("./useCases/asteroidsUseCases");
const { getStartDate } = require("./repositories/asteroidsRepository");

const app = express();
const PORT = process.env.PORT;

app.get("/meteors", (req, res) => {
  getAsteroidsHandler(getStartDate, req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
