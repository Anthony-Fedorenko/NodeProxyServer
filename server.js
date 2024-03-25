const express = require('express');
const axios = require("axios");
const { format, startOfWeek, addDays } = require("date-fns");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

const DATE_FORMAT = "yyyy-MM-dd";

const getStartDate = () => format(startOfWeek(new Date(), { weekStartsOn: 1 }), DATE_FORMAT);
const getEndDate = () => format(addDays(new Date(getStartDate()), 4), DATE_FORMAT);

const getAsteroidsInPeriod = async () => {
  try {
    const response = await axios.get(process.env.API_URL, {
      params: {
        start_date: getStartDate(),
        end_date: getEndDate(),
        api_key: process.env.API_KEY,
      },
    })
    return response.data;
  } catch(error) {
    console.error("Error occurred while fetching data from NASA API", error);
  throw error;
};
};

app.get('/meteors', async (req, res) => {
  try {
    const asteroidsData = await getAsteroidsInPeriod();
    res.json(asteroidsData);
  } catch (error) {
    res.status(500).json({error: "Internal server error"});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})