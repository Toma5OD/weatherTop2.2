"use strict";

const accounts = require("./accounts.js");
const uuid = require("uuid");
const axios = require("axios");
const logger = require("../utils/logger");
const stationstore = require("../models/station-store.js");
const station = require("./station.js");
const oneCallRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=52.160858&lon=-7.152420&units=metric&appid=6f24f9a7a44944d32189a230464945f8`;

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Template 1 Dashboard"
    };
    response.render("dashboard", viewData);
  },
  async addreport(request, response) {
    logger.info("rendering new report");
    let report = {};
    const lat = 52.160858;
    const lng = -7.15242;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=6f24f9a7a44944d32189a230464945f8`;
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      
let unix_timestamp = reading.dt
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
report.date = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      report.code = reading.weather[0].id;
      report.icon = reading.weather[0].icon;
      report.lat = lat;
      report.lng = lng;
      report.main = reading.weather[0].main;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
      const stationId = request.params.id;
    //const station = stationstore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      station: station,
      date: reading.date,
      code: reading.code,
      temperature: reading.temperature,
      windSpeed: reading.windspeed,
      windDirection: reading.winddirection,
      pressure: reading.pressure
    };
    logger.debug("New Reading = ", newReading);
    station.addReading(stationId, newReading);
    }
    console.log(report);
    
    const viewData = {
      title: "Weather Report - Tramore",
      reading: report
    };
    response.render("dashboard", viewData);
  },
  async addreport2(request, response) {
    logger.info("rendering new report");
    let report2 = {};
    const lat = 51.898;
    const lng = -8.4706;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=6f24f9a7a44944d32189a230464945f8`;
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      
      let unix_timestamp = reading.dt
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
report2.date = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      
      report2.code = reading.weather[0].id;
      report2.icon = reading.weather[0].icon;
      report2.lat = lat;
      report2.lng = lng;
      report2.main = reading.weather[0].main;
      report2.temperature = reading.temp;
      report2.windSpeed = reading.wind_speed;
      report2.pressure = reading.pressure;
      report2.windDirection = reading.wind_deg;
    }
    console.log(report2);
    const viewData = {
      title: "Weather Report - Cork",
      reading2: report2
    };
    response.render("dashboard", viewData);
  },
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      title: request.body.title,
      songs: []
    };
    logger.debug("Creating a new Station", newStation);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
