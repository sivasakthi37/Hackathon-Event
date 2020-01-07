
const usermodels = require('../app/userModel');

/**
 * @description:login is used to check the data is present in database or not..
 * @param {request from front end} req 
 * @param {responce from backend} res 
 */
exports.loginusers = (req, res) => {
    try {
        usermodels.login(req, (err, data) => {

            if (err) {
                console.log("err in service..");

                res(err);
            }
            else {
                console.log("service is working fine");

                
                res(null, data);
            }

        })
    }
    catch (err) {
        console.log("error in services:",err);
        
    }

}
/**
 * @description:register is used to register the user data in database...
 */

exports.registers = (req, res) => {
    try {

        usermodels.registration(req, (err, data) => {

            if (err) {
                console.log("err in service..");

                res(err);

            }
            else {

                console.log("service is working fine");
                res(null, data);

            }



        })
    }
    catch (err) {
        console.log("error in services:",err);
      

    }
}
