const {sign: Sign, verify: Verify} = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const sign = (payload) => Sign(payload, SECRET_KEY, {expiresIn: "24h"});
const verify = (paylaod) => Verify(paylaod, SECRET_KEY); 

module.exports = {
    verify,
    sign
};