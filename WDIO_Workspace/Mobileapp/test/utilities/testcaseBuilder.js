const { queryExecution } = require('../Config/Postgresqlconfig');
const { checkmethodName, checkAbstractMethod, arrayInsert, checkGeneric, mergedObj, checkReponse } = require('./utilities');
const { Execute, genericExecute } = require('../projects');
const { startStep, addStep, endStep } = require('./allureReporter')
const { DatabaseTables } = require("../../wdio.conf")

const logger = require('./winston');

exports.selectedTestCase = async (ID, isLastindex, type = 'testcasefixturesteps') => {
    try {
        const row = await queryExecution(`select * from  ${DatabaseTables.testcases} where test_case_id = ${ID}`);
        console.log(`select * from  ${DatabaseTables.testcases} where test_case_id = ${ID}`)
        console.log("-------:",row)
        if (row[0][type] && Object.keys(row[0][type]).length) {
            let parameters = row[0][type];
            // if (!isLastindex) parameters['loginPage_reload'] = "Default";
            startStep(`${type} : ${row[0].testcasename}`)
            let methodsList = Object.keys(parameters);
            if (checkAbstractMethod(methodsList)) {
                const abs = checkAbstractMethod(methodsList);
                const subAbs = await queryExecution(`select * from ${DatabaseTables.testcases} where TestcaseName = '${abs.testcaseName}'`);
                let absParameters = subAbs[0][type];
                // let absParameters = subAbs[0]['testcasefixturesteps'];
                let currentParameters = { ...parameters[abs.testcaseName] };
                methodsList = arrayInsert(methodsList, abs.index, Object.keys(absParameters))
                delete parameters[abs.testcaseName]
                parameters = {
                    ...parameters,
                    ...absParameters
                }
                parameters = mergedObj(parameters, currentParameters);
            }
            let Mresult = [];
            // console.log(JSON.stringify(methodsList))
            for (let methodIndex = 0; methodIndex < methodsList.length; methodIndex++) {
                if (checkGeneric(methodsList[methodIndex])) {
                    let result = await genericExecute({ ...parameters[methodsList[methodIndex]] })
                    if (!result) {
                        return result
                    }
                    Mresult.push(result)
                    if (Mresult.length === methodsList.length) {
                        return checkReponse(Mresult);
                    }
                    // return true
                } else {
                    let { method, page } = checkmethodName(methodsList[methodIndex]);
                    if (!method || !page) {
                        logger.error(!method ? 'Method is missing' : 'Page is missing')
                        return null
                    }
                    let result = await Execute(method, page, { ...parameters[methodsList[methodIndex]] });
                    if (!result) {
                        return result
                    }
                    Mresult.push(result)
                    if (Mresult.length === methodsList.length) {
                        return checkReponse(Mresult);
                    }

                }
            }
        }
        else {
            return true;
        }

    } catch (e) {
        logger.error(`selectedTestCase-error: ${e.message}`)
        return false;
    }
}