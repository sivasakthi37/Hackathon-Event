/**
 * @discription:import the express module..
 */
const express = require("express");
const route = express.Router();

/**
 * @description:require the controller to pass the data..
 */
var users = require("../controllers/user.controller");
var datastore = require("../controllers/dataStore.contoller");
/**
 * @description:require the controller to pass the data..
 */

route.post("/Login", users.login);

route.post("/Register", users.register);

route.post("/postanalizedata", datastore.postdata);
route.get("/getanalizedata", datastore.getdata);

module.exports = route;
