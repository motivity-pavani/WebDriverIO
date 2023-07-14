const format = require('pg-format');
const { dbtables } = require("../config")
module.exports = {
    getTestcasesListBuildQuery: (text) => {
        return format(` select test_case_id ,testcasename,aut,isactive from ${dbtables.testcases}
          where isactive = true ${text ? `and testcasename ilike  '%${text}%'` : ''} `);
    },
    getGroupsListListBuildQuery: (text = "", aut) => {
        return format(`
        select * from ${dbtables.TestCaseGroup} where aut = ${aut} and isactive = true ${text ? `and testgroupname ilike  '%${text}%'` : ''}`)
    },
    getSelectedTestCasesBuildQuery: (aut) => {
        return format(`select s.selecttestid ,s.typeid,s.executiondetailsid,s.isactive,
        CASE WHEN s.TypeID = 1 THEN 'testcase'
        WHEN s.TypeID = 2 THEN 'group'
        ELSE '' END
        AS typename,
        CASE WHEN s.TypeID = 1 THEN (select tcm.TestcaseName from ${dbtables.testcases} tcm where tcm.test_case_id = s.ExecutionDetailsID)
        WHEN s.TypeID = 2 THEN (select tcg.TestGroupName from ${dbtables.TestCaseGroup} tcg where tcg.TestCaseGroupId = s.ExecutionDetailsID)
        ELSE '' end
        as actionname
        from ${dbtables.selecttests} s where s.aut=${aut} `);
    },
    getSelectedTestCasesUpdateBuildQuery: (status, id) => {
        return format(`update ${dbtables.selecttests} set isactive = ${status} where selecttestid = ${id}`)
    },
    selectedTestCasesBuildQuery: (TypeID, ExecutionDetailsID, createdBy, aut) => {
        return format(`insert into ${dbtables.selecttests} (TypeID,ExecutionDetailsID,createdBy,aut) values (${TypeID}, ${ExecutionDetailsID},${createdBy},${aut})`)
    },
    deleteSelectTestCasesBuildQuery: (id, aut) => {
        return format(`delete from  ${dbtables.selecttests}  where selecttestid = ${id} and aut = ${aut}`)
    },
    getAllTestCaseswithoutAbstractBuildQuery: (aut) => {
        return format(` select * from ${dbtables.testcases} where aut = ${aut} and testcasename not ilike  '%abstract%'`)
    }


}