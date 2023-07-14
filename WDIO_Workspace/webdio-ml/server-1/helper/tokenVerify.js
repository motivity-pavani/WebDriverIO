const { noAuthRequired } = require('../config');
const { responseMessages } = require('../utilities/messages');
const { jwtDecode } = require('./jwtToken')
module.exports = {
    isAuthenticated: async (req, res, next) => {
        try {
            if (noAuthRequired.find(x => x === req.url)) {
                next();
            } else {
                let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'] || req.headers['authtoken'];
                if (typeof token !== 'undefined') {
                    const bearer = token.split(' ');
                    const bearerToken = bearer[1];
                    req.user = jwtDecode(bearerToken);
                    req.employee = jwtDecode(bearerToken)
                    next();
                } else {
                    responseHandler.errorResponse(res, responseMessages.unauthorizedRequest, responseMessages.unauthorizedRequest)
                }
            }
        } catch (err) {
            responseHandler.errorResponse(res, err.message, err.message)
        }
    }

}
