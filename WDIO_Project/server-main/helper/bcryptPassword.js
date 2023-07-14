const bcrypt = require('bcrypt');
const { saltRounds } = require('../config');
const { responseMessages } = require('../utilities/messages')
exports.passwordHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    reject(err.message)
                }
                else {
                    resolve(hash)
                }
            });
        });
    });
}
exports.verifyPassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if (result) {
                resolve(result)
            }
            else {
                reject({ message: responseMessages.loginPasswordIncorrect })
            }
        });
    });
}
