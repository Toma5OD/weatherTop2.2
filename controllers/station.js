"use strict";

const logger = require("../utils/logger");
const stationstore = require("../models/station-store");
const uuid = require("uuid");
const stationStore = require("../models/station-store");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);
    const viewData = {
      title: "Station",
      station: stationStore.getStation(stationId)
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },
  addReading(request, response) {
    var stationId = uuid.v1();
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      station: station,
      date: request.reading.date,
      code: request.reading.code,
      temperature: request.reading.temperature,
      windSpeed: request.reading.windspeed,
      windDirection: request.reading.winddirection,
      pressure: request.reading.pressure
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;