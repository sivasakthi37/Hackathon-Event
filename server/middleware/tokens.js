const jwt = require("jsonwebtoken");
module.exports = {
  GenerateTokenAuthentication(payload) {
    const token = jwt.sign({ payload }, "secretkey-Authentication", {
      expiresIn: "1d"
    }); // expires in 1 day
    const obj = {
      success: true,
      message: "Token Generated!!",
      token: token
    };
    return obj;
  }
};
