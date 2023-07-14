const { selectedTestCase } = require('../utilities/testcaseBuilder');
const data = require('../../testcases.json');
const logger = require('../utilities/winston');
const { testcasesTypes } = require('../utilities/utilities');
var chai = require('chai');
var assert = chai.assert;

describe(`Automation`, async function () {
  data.testcases.forEach((selectedTestcase, index) => {
    let isLastindex = index == data.testcases.length - 1
    if (selectedTestcase.groupinlist && selectedTestcase.groupinlist.length) {
      selectedTestcase.groupinlist.forEach(group => {
        it(`${selectedTestcase.actionname} -   test cases`, async () => {
          for (let i = 0; i < testcasesTypes.length; i++) {
            logger.info(`Group TestCase Name: ${selectedTestcase.actionname}-${group.testname} - ${testcasesTypes[i]}`)
            var resp = await browser.call(async () => {
              let results = await selectedTestCase(group.testid, isLastindex, testcasesTypes[i])
              if (!results) {
                assert.fail(`${selectedTestcase.actionname}  is failed`);
                // Assert.error(`${selectedTestcase.actionname}  is failed`);
              }
            })
          }
        })
      });
    }
    else {
      const { actionname, executiondetailsid } = selectedTestcase;
      it(`${actionname} -   test cases`, async () => {
        for (let i = 0; i < testcasesTypes.length; i++) {
          logger.info(`TestCase Name: ${actionname} - ${testcasesTypes[i]}`)
          var resp = await browser.call(async () => {
            let results = await selectedTestCase(executiondetailsid, isLastindex, testcasesTypes[i]);
            if (!results) {
              assert.fail(`${actionname}  is failed`)
            }
          })
        }
      })
    }
  })
});
