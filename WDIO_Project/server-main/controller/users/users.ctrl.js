const { passwordHash, verifyPassword } = require("../../helper/bcryptPassword")
const { createUser,
    loginUser,
    getLookup,
    addActions,
    getActionBuildQuery,
    testCaseBuildQuery,
    getActionPagesListQuery,
    getActionListBypageNameQuery,
    getAbstractTestCasesBuildQuery,
    updateActionStatus,
    deleteAction,
    getAllTestCases,
    createGroup,
    getGroupMappings,
    updateGroupMappingStatus,
    updateGroupStatus,
    getAllGroups,
    checkActionsIsExistBuildQuery,
    checkTestcaseNameIsExistBuildQuery,
    getAllUsers,
    addAut,
    addAutMapping,
    getAutQuery,
    updateUserNameandDeleteMappingAut,
    getTestCase,
    testCaseUpdate,
    getcurrentActionQuery,
    updateActionQuery,
} = require('../../Database/buildQuery');
const { responseMessages } = require('../../utilities/messages');
const { generateToken } = require("../../helper/jwtToken");

exports.signIn = async (req, res) => {
    try {
        const checkEmail = await queryExecution(loginUser({ ...req.body }))
        if (!checkEmail.length) {
            return responseHandler.errorResponse(res, responseMessages.emailNotMatched, responseMessages.emailNotMatched)
        }
        await verifyPassword(req.body.Password, checkEmail[0].password)
        // console.log(checkEmail[0]);
        // console.log(res.session)
        res.cookie('isadmin', checkEmail[0].isadmin);
        // res.session.isadmin = checkEmail[0].isadmin
        responseHandler.successResponse(res, {
            token: generateToken({ Email: checkEmail[0].email, Name: checkEmail[0].name, userid: checkEmail[0].userid }),
            ...checkEmail[0]
        }, responseMessages.LoginSuccess)
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message)
    }
}
exports.setAuth = async (req, res) => {
    try {
        const data = req.user;
        responseHandler.successResponse(res, {
            token: generateToken({ ...data, autname: req.body.autname, autid: req.body.autid })
        }, responseMessages.LoginSuccess)

    }
    catch (err) {
        responseHandler.errorResponse(res, err.message)
    }
}

exports.signUp = async (req, res) => {
    try {
        if (req.body.Edit) {
            const resp = await queryExecution(updateUserNameandDeleteMappingAut({ ...req.body }))
            const autResp = await queryExecution(addAutMapping(req.body.aut, req.body.Email))
            responseHandler.successResponse(res, resp, "Record successfully updated")
        } else {
            req.body.Password = await passwordHash(req.body.Password);
            const resp = await queryExecution(createUser({ ...req.body }))
            const autResp = await queryExecution(addAutMapping(req.body.aut, req.body.Email))
            responseHandler.successResponse(res, resp, responseMessages.AccountCreated)
        }
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }

}

exports.getLookup = async (req, res) => {
    try {
        const resp = await queryExecution(getLookup(req.params.id))
        responseHandler.successResponse(res, resp, responseMessages.getLookup)
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }

}

exports.addAction = async (req, res) => {
    try {
        let errorMessage = '';
        console.log("req.user:", req.user.autid)
        const resp = await queryMultiExecution(checkActionsIsExistBuildQuery(req.body.list, req.user.autid))
        let isArray = Array.isArray(resp);
        if (isArray) {
            resp.forEach(row => {
                if (row.rows.length != 0) {
                    errorMessage = `${row.rows[0].action_name} action already exist `;
                }
            });
        }
        else {
            const { rows } = resp;
            if (rows.length != 0) errorMessage = `${row.rows[0].action_name} action already exist `;
        }
        if (errorMessage) {
            responseHandler.errorResponse(res, errorMessage, errorMessage)
        }
        if (!errorMessage) {
            const respData = await queryExecution(addActions(req.body.list, req.user.userid, req.user.autid))
            responseHandler.successResponse(res, respData, responseMessages.AddAction)
        }
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }
}
exports.updateAction = async (req, res) => {
    try {
        const respData = await queryExecution(updateActionQuery(req.body.list, req.user.userid, req.user.autid, req.body.action_id))
        responseHandler.successResponse(res, respData, 'updated action successfully')
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }
}
exports.getActionList = async (req, res) => {
    try {
        const resp = await queryExecution(getActionBuildQuery())
        responseHandler.successResponse(res, resp, responseMessages.getActionList)
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }
}
exports.addTestcase = async (req, res) => {
    try {
        req.body.aut = req.user.autid;
        const check = await queryExecution(checkTestcaseNameIsExistBuildQuery(req.body))
        if (check.length != 0) {
            responseHandler.errorResponse(res, `${req.body.testCaseName} is already exist`, `${req.body.testCaseName} is already exist`)
            return null
        }

        const resp = await queryExecution(testCaseBuildQuery({ ...req.body, userid: req.user.userid }))
        responseHandler.successResponse(res, resp, responseMessages.addTestCase)

    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }

}

exports.updateTestCases = async (req, res) => {
    try {
        req.body.aut = req.user.autid;
        const resp = await queryExecution(testCaseUpdate({ ...req.body, userid: req.user.userid }))
        responseHandler.successResponse(res, resp, 'updated test case successfully')
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message);
    }

}
exports.getActionPagesList = async (req, res) => {
    try {
        const resp = await queryExecution(getActionPagesListQuery(req.user.autid))
        responseHandler.successResponse(res, resp, 'Get LIST')
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }

}

exports.getCurrentAction = async (req, res) => {
    try {
        const resp = await queryExecution(getcurrentActionQuery(req.user.autid, req.params.action_id));
        responseHandler.successResponse(res, resp, 'Get Action')

    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }

}

exports.getActionListBypageName = async (req, res) => {
    try {
        const resp = await queryExecution(getActionListBypageNameQuery(req.params.pageName, req.user.autid))
        responseHandler.successResponse(res, resp, 'Get LIST')
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }
}
exports.getAbstractTestCases = async (req, res) => {
    try {
        const resp = await queryExecution(getAbstractTestCasesBuildQuery(req.user.autid))
        responseHandler.successResponse(res, resp, 'Get LIST')
    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message)
    }

}

exports.updateActionStatus = async (req, res) => {
    try {
        const resp = await queryExecution(updateActionStatus(req.params.isactive, req.params.action_id));
        responseHandler.successResponse(res, resp, 'The action has been updated');
    } catch (err) {
        responseHandler.errorResponse(res, err.message, err.message);
    }
}

exports.deleteAction = async (req, res) => {
    try {
        const resp = await queryExecution(deleteAction(req.params.action_id));
        responseHandler.successResponse(res, resp, 'The action has been deleted!');
    } catch (err) {
        responseHandler.errorResponse(res, err.message, err.message);
    }
}

exports.getAllTestCases = async (req, res) => {
    try {
        const resp = await queryExecution(getAllTestCases(req.user.autid));
        responseHandler.successResponse(res, resp, 'Get ALL TestCases.');
    } catch (err) {
        responseHandler.errorResponse(res, err.message, err.message);
    }
}

exports.getTestCases = async (req, res) => {
    try {
        const resp = await queryExecution(getTestCase(req.params.testid, req.user.autid))
        responseHandler.successResponse(res, resp, 'Get TestCases.');


    } catch (err) {
        responseHandler.errorResponse(res, err.message, err.message);
    }

}



exports.createGroup = async (req, res) => {
    try {
        const resp = await queryExecution(createGroup(req.params.groupname, req.params.testids, req.user.autid));
        responseHandler.successResponse(res, resp, 'Get ALL TestCases.');
    } catch (err) {
        responseHandler.errorResponse(res, err.message, err.message);
    }
}

exports.getGroupMappings = async (req, res) => {
    try {
        const resp = await queryExecution(getGroupMappings(req.params.testcasegroupid, req.user.autid));
        responseHandler.successResponse(res, resp, 'Get ALL TestCases.');
    } catch (err) {
        responseHandler.errorResponse(res, err.message, err.message);
    }
}

exports.updateGroupMappingStatus = async (req, res) => {
    try {
        const resp = await queryExecution(updateGroupMappingStatus(req.params.isactive, req.params.testcasegroupid, req.params.testid));
        responseHandler.successResponse(res, resp, 'Group Mapping is updated');
    } catch (err) {
        responseHandler.errorResponse(res, err.message, err.message);
    }
}

exports.updateGroupStatus = async (req, res) => {
    try {
        const resp = await queryExecution(updateGroupStatus(req.params.isactive, req.params.testcasegroupid));
        responseHandler.successResponse(res, resp, 'Group status updated');
    } catch (err) {
        responseHandler.errorResponse(res, err.message, err.message);
    }
}

exports.getAllGroups = async (req, res) => {
    try {
        const resp = await queryExecution(getAllGroups(req.user.autid));
        responseHandler.successResponse(res, resp, 'Group status updated');
    } catch (err) {
        responseHandler.errorResponse(res, err.message, err.message);
    }
}

exports.getUsers = async (req, res) => {
    try {
        const resp = await queryExecution(getAllUsers());
        responseHandler.successResponse(res, resp, 'Group status updated');
    } catch (err) {
        responseHandler.errorResponse(res, err.message, err.message);
    }

}

exports.addAut = async (req, res) => {
    try {
        const respData = await queryExecution(addAut({ ...req.body, createdBy: req.user.userid }))
        responseHandler.successResponse(res, respData, "Aut added successfully")

    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message);

    }

}

exports.getAutList = async (req, res) => {
    try {
        const respData = await queryExecution(getAutQuery)
        responseHandler.successResponse(res, respData, "Aut List")

    }
    catch (err) {
        responseHandler.errorResponse(res, err.message, err.message);

    }

}