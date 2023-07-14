
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const helper = require('../helper');
var path = require('path');
const { endpoint, jwtPrivateKey } = require('../config');
const { isAuthenticated } = require("../helper/tokenVerify");
const cookieParser = require('cookie-parser')
const session = require('express-session');


module.exports = () => {
    for (const key in helper) {
        global[key] = helper[key];
    }
    global['commonErrorMessage'] = 'Something went wrong please try again';
    const app = express();
    app.use(cookieParser())
    app.use(cors());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    // app.use(bodyParser.urlencoded({ extended: false }))
    // app.use(bodyParser.json())
    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: "Shh, its a secret!",
        cookie: { maxAge: 60000 }
    }));
    // app.use(session({ cookie: { isadmin: 0 }, secret: jwtPrivateKey }))
    // app.use(express.static(path.join(root, '/public')));
    app.use((error, request, response, next) => {
        if (error !== null) {
            logger.error(`express/index.js:line :: ${error.message}`)
            return response.json({ status: 403, message: "Invalid json" });
        }
        next();
    });
    app.use(isAuthenticated)
    app.use(endpoint, require("../controller/users/users.routes"));
    app.use(endpoint, require("../controller/selectedTestCases"))
    return app
}