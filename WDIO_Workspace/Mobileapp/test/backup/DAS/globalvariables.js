const { generateRandomNumber, dateMethods } = require('../utilities')
module.exports = {
    accountNameValue: "ML" + generateRandomNumber(),
    dt: dateMethods.generateCurrrentDateYYYYMMDDHypen(),
    generate: (length) => {
        var chars = '0123456789',
            result = ""
        for (var i = length; i > 0; --i)
            result += chars[Math.round(Math.random() * (chars.length - 1))]
        return result
    }

}