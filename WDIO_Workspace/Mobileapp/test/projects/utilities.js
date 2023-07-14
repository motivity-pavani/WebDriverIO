exports.generateRandomNumber = () => {
    return Math.floor(Math.random() * (9999999 - 1000000) + 1000000)
}
exports.dateMethods = {
    getTodaysDate: () => {
        return new Date();
    },
    generateCurrrentDateYYYYMMDDHypen: () => {
        var today = new Date();
        var dd = today.getDate().toString()
        if (dd.toString().length > 1) {

        } else {
            dd = '0' + dd
        }
        var mm = today.getMonth() + 1 //January is 0!
        if (mm.toString().length > 1) {

        } else {
            mm = '0' + mm
        }
        var yyyy = today.getFullYear();
        var dt = mm + '-' + dd + '-' + yyyy;
        console.log("current date - " + dt)
        return dt
    }

}