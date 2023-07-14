var cp = require("child_process");

const { getTestcasesListBuildQuery,
    getGroupsListListBuildQuery,
    getSelectedTestCasesBuildQuery,
    getSelectedTestCasesUpdateBuildQuery,
    selectedTestCasesBuildQuery,
    getAllTestCaseswithoutAbstractBuildQuery,
    deleteSelectTestCasesBuildQuery } = require('../../Database/seletedTestcasesBuildQuery');
exports.getTestcasesList = async (req, res) => {

    try {
        const resp = await queryExecution(getTestcasesListBuildQuery())
        responseHandler.successResponse(res, resp, 'Get LIST')
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }

}
exports.getGroupsList = async (req, res) => {

    try {
        const resp = await queryExecution(getGroupsListListBuildQuery("", req.user.autid))
        responseHandler.successResponse(res, resp, 'Get LIST')
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }
}

exports.getSelectedTestCasesList = async (req, res) => {
    try {
        const resp = await queryExecution(getSelectedTestCasesBuildQuery(req.user.autid))
        responseHandler.successResponse(res, resp, 'Get LIST')
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }
}

exports.selectedTestCasesUpdate = async (req, res) => {
    try {
        const resp = await queryExecution(getSelectedTestCasesUpdateBuildQuery(!req.body.isactive, req.body.selecttestid))
        responseHandler.successResponse(res, resp, 'Update successfully completed')
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }
}
exports.addselectedTestCases = async (req, res) => {
    try {
        const resp = await queryExecution(selectedTestCasesBuildQuery(req.body.typeid, req.body.executiondetailsid, req.user.userid, req.user.autid))
        responseHandler.successResponse(res, resp, `${req.body.typeid == 1 ? 'Testcase' : 'group'} add successfully completed`)
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }
}
exports.deleteSelectTestCase = async (req, res) => {
    try {
        const resp = await queryExecution(deleteSelectTestCasesBuildQuery(req.body.selecttestid, req.user.autid))
        responseHandler.successResponse(res, resp, `${req.body.typeid == 1 ? 'Testcase' : 'group'} delete successfully completed`)
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }
}
exports.getAllTestCaseswithoutAbstract = async (req, res) => {
    try {
        const resp = await queryExecution(getAllTestCaseswithoutAbstractBuildQuery(req.user.autid))
        responseHandler.successResponse(res, resp, `Gel List`)
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }

}

exports.runTestCases = async (req, res) => {
    try {
        let cmd = `cd D:\Workspace\Generic auto flow\webdriverio_11-Feb-22 (1)\webdriverio && npx wdio`;
        cp.exec("npm run wdio", function (error, stdout, stderr) {
            console.log(`error: ${error}`);
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
        // const s = spawn('bash');
        // s.stdin.end(cmd);
        // s.once('exit', code => {
        //     // exit
        // });
        // const child = spawn(cmd, []);
        // child.stdout.on('data', (data) => {
        //     console.log(`stdout: ${data}`);
        // });

        // child.stderr.on('data', (data) => {
        //     console.error(`stderr: ${data}`);
        // });

        // child.on('close', (code) => {
        //     console.log(`child process exited with code ${code}`);
        // });
        // exec('npx wdio', { shell: 'D:\Workspace\Generic auto flow\webdriverio_11-Feb-22 (1)\webdriverio' }, (err, stdout, stderr) => {
        //     if (err) {
        //         console.log(err)
        //         // node couldn't execute the command
        //         return;
        //     }

        //     // the *entire* stdout and stderr (buffered)
        //     console.log(`stdout: ${stdout}`);
        //     console.log(`stderr: ${stderr}`);
        // });
        responseHandler.successResponse(res, {}, `Process start`)
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }

}