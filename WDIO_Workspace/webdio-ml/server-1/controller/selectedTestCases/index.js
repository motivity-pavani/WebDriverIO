const router = require('express').Router();
const ctrl = require('./ctrl');

router.get('/getTestcasesList', ctrl.getTestcasesList);
router.get('/getGroupsList', ctrl.getGroupsList);
router.get('/getSelectedTestCasesList', ctrl.getSelectedTestCasesList);
router.post('/selectedTestCasesUpdate', ctrl.selectedTestCasesUpdate);
router.post('/addselectedTestCases', ctrl.addselectedTestCases);
router.post('/deleteSelectTestCase', ctrl.deleteSelectTestCase);
router.get('/getAllTestCaseswithoutAbstract', ctrl.getAllTestCaseswithoutAbstract);
router.get('/runTestCases', ctrl.runTestCases);








module.exports = router;