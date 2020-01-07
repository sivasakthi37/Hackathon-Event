/**
 * @description:import the services file
 */
var userservices = require("../services/user.servies");
/**
 * @description:import the token file
 */
var gentoken = require("../middleware/tokens");
const responseTime = require('response-time')

const redis = require("redis");

const client = redis.createClient();

const express =require('express');

const app=express();

// Print redis errors to the console
client.on("error", err => {
  console.log("Error " + err);
});

app.use(responseTime());

exports.login = (req, res) => {
  console.log("request in req", req.body);

  try {
    var response = {};
    /**
     * @description:pass the request data to sevices....
     */
    userservices.loginusers(req, (err, result) => {
      if (err) {
        response.sucess = false;
        response.result = err;
        res.status(500).send(response);
      } else {
        const payload = {
          user_id: result._id,
          username: result.firstname,
          email: result.email,
          profilepic: result.profilepic,
          password: result.password,
          sucess: true
        };
        const obj = gentoken.GenerateTokenAuthentication(payload);

        response.token = obj;

        const redisKey1 = result.email + result._id;

        client.setex(redisKey1, 3600, JSON.stringify(response.token.token));

        let data = {
          username: result.firstname,
          email: result.email,
          token: response.token.token
        };
        return res.status(200).send(data);
      }
    });
  } catch (err) {
    console.log("error in controller :", err);
  }
};
/**
 * @description:register is used to register the user data in database...
 */
exports.register = (req, res) => {
  try {
    var responsedata = {};
    userservices.registers(req, (err, result) => {
      if (err) {
        responsedata.sucess = false;
        responsedata.result = err;
        res.status(500).send(responsedata);
      } else {
        responsedata.sucess = true;
        responsedata.result = "registration sucessfully";
        res.status(200).send(responsedata);
      }
    });
  } catch (err) {
    console.log("error in controller,", err);
  }
};
exports.deleteredis = (req, res) => {
  console.log("req in logout-->", req.body);
  const redisKey = req.body.email + req.body.userid;

  client.del(redisKey, (err, response) => {
    if (response == 1) {
      console.log("Deleted Successfully!");

      res.status(200).send("Deleted Successfully!");
    } else {
      console.log("Cannot delete");
      res.status(500).send("Cannot delete");
    }
  });
};
