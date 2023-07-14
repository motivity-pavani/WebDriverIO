var jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../config');
exports.generateToken = (object) => jwt.sign(object, jwtPrivateKey);
exports.jwtDecode = (token) => jwt.verify(token, jwtPrivateKey);
