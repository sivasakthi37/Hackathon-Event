const postdataservices = require("../services/data.services");

exports.postdata = (req, res) => {
  try {
    var responsedata = {};
    postdataservices.postdata(req, (err, result) => {
      if (err) {
        responsedata.success = false;
        responsedata.result = err;
        res.status(500).send(responsedata);
      } else {
        responsedata.success = true;
        responsedata.result = "data save sucessfully";
        res.status(200).send(responsedata);
      }
    });
  } catch (err) {
    console.log("error in controller,", err);
  }
};

exports.getdata = (req, res) => {
  try {
    var responsedata = {};
    postdataservices.getdata(req, (err, result) => {
      if (err) {
        responsedata.success = false;
        responsedata.result = err;
        res.status(500).send(responsedata);
      } else {
        responsedata.success = true;
        responsedata.result = result;
        res.status(200).send(responsedata);
      }
    });
  } catch (err) {
    console.log("error in controller,", err);
  }
};
