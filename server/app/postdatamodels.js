const mongoose = require("mongoose");

/**
 * @description:dataSchema is used to create a schema...
 */
const dataSchema = mongoose.Schema(
  {
    // username: {
    //   type: String
    //   //   required: [true, "firstname require"]
    // },
    // browserdetails: {
    //   type: Array

    //   //   required: [true, "lastname require"]
    // }
    sessionName: {
      type: String
    },
    startTime: {
      type: String
    },
    userName: {
      type: String
    },
    endTime: {
      type: String
    },
    usageTime: {
      type: String
    },
    keylogged: {
      type: String
    },
    title:{
        type:String
    }

    // email: {
    //   type: String,
    // //   required: [true, "email require"]
    // },
    // password: {
    //   type: String,
    // //   required: [true, "password require"]
    // },
    // profilepic: {
    //   type: String
    // }
  }
  //   {
  //     timestamps: true
  //   }
);

function Browserdata() {}
/**
 * @description:it is used to crete a collection in your database..
 */
const browserdata = mongoose.model("browserdata", dataSchema);

/**
 * @description:register is used to register the user data in database...
 * @param {req data from the client} req
 * @param {responce data from the database} res
 */

Browserdata.prototype.postdatamodels = (req, res) => {
  console.log("====================================");
  console.log("req", req.body);
  console.log("====================================");

  let {
    sessionName,
    startTime,
    userName,
    endTime,
    usageTime,
    keyLogged,
    title
  } = req.body;
  const postdatamodels = new browserdata({
    sessionName: sessionName,
    startTime: startTime,
    userName: userName,
    endTime: endTime,
    usageTime: usageTime,
    keylogged: keyLogged,
    title:title
  });

  postdatamodels.save((err, result) => {
    if (err) {
      console.log("data not save", err);
      res(err);
    } else {
      console.log("data saved Sucessfully", result);
      res(null, result);
    }
  });
};

Browserdata.prototype.getdatamodels = (req, callback) => {
  let queryObject = {};

  if (Object.keys(req.query).length != 0) {
    for (key in req.query) {
      queryObject[key] = req.query[key];
    }
  }
  console.log("queryObject", queryObject);
  browserdata.find(queryObject, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports = new Browserdata();
