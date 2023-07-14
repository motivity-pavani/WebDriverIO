const router = require('express').Router();
const { signIn, signUp,
    getLookup, addAction,
    getActionList, addTestcase,
    getActionPagesList, getActionListBypageName,
    getAbstractTestCases, updateActionStatus, deleteAction,
    getAllTestCases, createGroup, getGroupMappings,
    updateGroupMappingStatus, updateGroupStatus, getAllGroups,
    getUsers,
    getAutList,
    setAuth,
    getTestCases,
    addAut,
    updateTestCases,
    getCurrentAction,
    updateAction
} = require("./users.ctrl");

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.get('/getlookup/:id', getLookup);
router.post('/addAction', addAction);
router.get('/getActionList', getActionList);
router.post('/addTestcase', addTestcase);
router.get('/getActionPagesList', getActionPagesList);
router.get('/getActionListBypageName/:pageName', getActionListBypageName);
router.post('/updateAction/:isactive/:action_id', updateActionStatus);
router.get('/deleteAction/:action_id', deleteAction);
router.get('/getAbstractTestCases', getAbstractTestCases);
router.get('/getAllTestCases', getAllTestCases);
router.post('/createGroup/:groupname/:testids', createGroup);
router.get('/getGroupMappings/:testcasegroupid', getGroupMappings);
router.post('/updateGroupMappingStatus/:isactive/:testcasegroupid/:testid', updateGroupMappingStatus);
router.post('/updateGroupStatus/:isactive/:testcasegroupid', updateGroupStatus);
router.get('/getAllGroups', getAllGroups);
router.get('/getUsers', getUsers);
router.post('/addAut', addAut);
router.get('/getAutList', getAutList);
router.post('/setAuth', setAuth);
router.get('/getTestCases/:testid', getTestCases);
router.post('/updateTestCases', updateTestCases);
router.get('/getCurrentAction/:action_id', getCurrentAction);
router.post('/updateAction', updateAction)






module.exports = router;