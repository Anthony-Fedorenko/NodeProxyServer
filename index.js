const axios = require("axios");
const { format, startOfWeek, addDays } = require("date-fns");
require('dotenv').config();

const DATE_FORMAT = "yyyy-MM-dd";

const getStartDate = () => format(startOfWeek(new Date(), { weekStartsOn: 1 }), DATE_FORMAT);
const getEndDate = () => format(addDays(new Date(getStartDate()), 4), DATE_FORMAT);

const getAsteroidsInPeriod = () => {
  axios
    .get(process.env.API_URL, {
      params: {
        start_date: getStartDate(),
        end_date: getEndDate(),
        api_key: process.env.API_KEY,
      },
    })
    .then((response) => printAllAsteroids(response.data))
    .catch((error) => {
      console.error("Error occurred while fetching data from NASA API", error);
      throw error;
    });
};

const printJsonToConsole = (data) => {
  console.log(JSON.stringify(data, null, 2));
};

const printAsteroidsCountToConsole = (startDate, endDate, asteroidCount) => {
  console.log(
    `From ${startDate} to ${endDate} were seen ${asteroidCount} asteroids.`
  );
};

const printAllAsteroids = (data) => {
  printJsonToConsole(data);
  const { element_count } = data;
  const startDate = getStartDate();
  const endDate = getEndDate();
  printAsteroidsCountToConsole(startDate, endDate, element_count);
};

getAsteroidsInPeriod();