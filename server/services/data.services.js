const postdatamodels = require("../app/postdatamodels");

exports.postdata = (req, res) => {
  try {
    postdatamodels.postdatamodels(req, (err, data) => {
      if (err) {
        console.log("err in service..");
        res(err);
      } else {
        console.log("service is working fine");
        res(null, data);
      }
    });
  } catch (err) {
    console.log("error in services:", err);
  }
};


exports.getdata = (req, res) => {
    try {
      postdatamodels.getdatamodels(req, (err, data) => {
        if (err) {
          console.log("err in service..");
          res(err);
        } else {
          console.log("service is working fine");
          res(null, data);
        }
      });
    } catch (err) {
      console.log("error in services:", err);
    }
  };