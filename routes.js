"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require("./controllers/station.js");

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.post("/dashboard/addreport", dashboard.addreport);
router.put("/dashboard/addreport2", dashboard.addreport2);
router.get("/dashboard/addreport2", dashboard.addreport2);
router.get("/about", about.index);

router.post("/station/:id/addreading", station.addReading);

module.exports = router;
