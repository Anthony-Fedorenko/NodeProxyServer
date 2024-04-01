const axios = require("axios");
const { format, startOfWeek, addDays } = require("date-fns");
require("dotenv").config();

const DATE_FORMAT = "yyyy-MM-dd";

const getStartDate = () =>
  format(startOfWeek(new Date(), { weekStartsOn: 1 }), DATE_FORMAT);
const getEndDate = () =>
  format(addDays(new Date(getStartDate()), 4), DATE_FORMAT);

const getAsteroidsInPeriod = async () => {
  try {
    const response = await axios.get(process.env.API_URL, {
      params: {
        start_date: getStartDate(),
        end_date: getEndDate(),
        api_key: process.env.API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching data from NASA API", error);
    throw error;
  }
};

module.exports = { getAsteroidsInPeriod, getStartDate, getEndDate };
