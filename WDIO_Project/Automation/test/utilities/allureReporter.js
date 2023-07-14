const allureReporter = require('@wdio/allure-reporter').default;

exports.startStep = async (string) => {
    allureReporter.startStep(`Test Case Name : ${string}`)
}
exports.addStep = async (string, content = '', status = 'passed') => {
    await allureReporter.addStep(string, content, status)
}
exports.endStep = async (status = 'passed') => {
    await allureReporter.endStep(status)
}