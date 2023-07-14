const format = require('pg-format');
const { dbtables } = require("../config")
module.exports = {
    createUser: ({ Name, Email, Password }) => {
        return format(`call USP_CREATE_USER('${Name}','${Password}','${Email}')`)
    },
    addAutMapping: (list, email) => {
        return format(list.map(x => {
            return `insert into autmapping_dev (autid,userid)
            select ${x},userid from users  where email='${email}';`
        }).join(";"))

    },
    updateUserNameandDeleteMappingAut: ({ Name, Email }) => {
        return format(`UPDATE users SET name='${Name}' WHERE email='${Email}';
        DELETE FROM autmapping_dev
        WHERE userid = (select userid from users where  email='${Email}')`)

    },
    loginUser: ({ Email }) => {
        // return format(`select * from users where Email='${Email}'`)
        return format(`select u.*,(select json_agg(json_build_object('autname',ad.autname,'autid',ad.autid)) from autmapping_dev am
        left join  aut_dev ad on ad.autid = am.autid
        where am.userid = u.userid ) as aut from users u where u.email='${Email}'`)
    },
    getLookup: (id) => {
        return format(`select * from get_lookup(${id})`)
    },
    // actionCreate: ({ page, action, actionParameters, subAction, subActionParameters, userid }) => {
    //     return format(`insert into actions (page,action_name,action_parameters,sub_action_name,sub_action_parameters,createdBy) 
    //     values ('${page}','${action}','${JSON.stringify(actionParameters)}','${subAction}','${JSON.stringify(subActionParameters)}',${userid})`)
    // },
    // actionCreate: ({ page, list, userid }) => {
    //     return format(`insert into action_master (page_name,actions,createdBy)
    //     values ('${page}','${JSON.stringify(list)}',${userid}) `)
    // },
    getActionBuildQuery: () => {
        return format(`select * from ${dbtables.actions_config}`)
    },
    testCaseBuildQuery: ({ testCaseName, aut, parameter: {
        TestCaseFixtureSteps = {},
        TestCaseSteps = {},
        TestCaseClosureSteps = {},
        TestCaseValidationSteps = {}
    }, userid, totalPayload }) => {
        return format(`insert into ${dbtables.testcases} (TestcaseName,aut,TestCaseFixtureSteps,TestCaseSteps,TestCaseValidationSteps,
            TestCaseClosureSteps,totalPayload,createdBy) values ('${testCaseName}',${aut},'${JSON.stringify(TestCaseFixtureSteps)}',
            '${JSON.stringify(TestCaseSteps)}','${JSON.stringify(TestCaseValidationSteps)}','${JSON.stringify(TestCaseClosureSteps)}',
            '${JSON.stringify(totalPayload)}',${userid}) `)
    },
    testCaseUpdate: ({ testCaseName, aut, test_case_id, parameter: {
        TestCaseFixtureSteps = {},
        TestCaseSteps = {},
        TestCaseClosureSteps = {},
        TestCaseValidationSteps = {},
    }, userid, totalPayload }) => {
        return format(`
        UPDATE ${dbtables.testcases} 
        SET
        testCaseName = '${testCaseName}',
         TestCaseFixtureSteps = '${JSON.stringify(TestCaseFixtureSteps)}',
        TestCaseSteps = '${JSON.stringify(TestCaseSteps)}',
        TestCaseValidationSteps = '${JSON.stringify(TestCaseValidationSteps)}',
        TestCaseClosureSteps = '${JSON.stringify(TestCaseClosureSteps)}',
        totalPayload = '${JSON.stringify(totalPayload)}',
        updateby = ${userid},
        updatedat = CURRENT_TIMESTAMP
        where aut = ${aut} and test_case_id=${test_case_id}
        `)

    },
    addActions: (list, createdBy, aut) => {
        return format(`insert into ${dbtables.actions_config} (page_name,aut,action_name,sub_action_name,action_parameters,sub_action_parameters,noOfFields,subActionNoOfFields,createdBy) values
        ${list.map(row => {
            return `('${row.page_name}',${aut},'${row.action_name}','${row.sub_action_name}','${JSON.stringify(row.action_parameters)}','${JSON.stringify(row.sub_action_parameters)}',
            ${row.noOfFields},${row.subActionNoOfFields},${createdBy})`
        }).join(',')}`)

    },
    updateActionQuery: (list, createdBy, aut, action_id) => {
        const row = list[0];
        return format(`update ${dbtables.actions_config} 
        set page_name = '${row.page_name}',
        action_name = '${row.action_name}',
        sub_action_name = '${row.sub_action_name}',
        action_parameters = '${JSON.stringify(row.action_parameters)}',
        sub_action_parameters = '${JSON.stringify(row.sub_action_parameters)}',
        noOfFields =  ${row.noOfFields},
        subActionNoOfFields = ${row.subActionNoOfFields},
        updateby = ${createdBy},
        updatedat = CURRENT_TIMESTAMP
        where action_id = ${action_id} and aut = ${aut}


        `)

    },
    checkTestcaseNameIsExistBuildQuery: ({ testCaseName, aut }) => {
        return format(`select * from ${dbtables.testcases} td  where testcasename = '${testCaseName}' and aut = ${aut}`)

    },
    checkActionsIsExistBuildQuery: (list, aut) => {
        let q = list.map(row => {
            return format(`select * from ${dbtables.actions_config} ac where page_name = '${row.page_name}'and aut=${aut}  and action_name ='${row.action_name}'`)
        }).join(';');
        return q;
    },
    // getActionBuildQuery: () => {
    //     return format(`select * from actions a where a.isactive=true`)
    // }
    getActionPagesListQuery: (aut) => {
        return format(`SELECT DISTINCT page_name FROM  ${dbtables.actions_config} where aut=${aut}`)
    },
    getcurrentActionQuery: (aut, action_id) => {
        return format(`SELECT * FROM  ${dbtables.actions_config} where aut=${aut} and action_id = ${action_id}`)
    },
    getActionListBypageNameQuery: (page_name, aut) => {
        return format(`select * from ${dbtables.actions_config} where page_name='${page_name}' and aut = ${aut}`)
    },
    getAbstractTestCasesBuildQuery: (aut) => {
        return format(`select * from ${dbtables.testcases} where aut = ${aut} and testcasename ilike  'abstract%'`)
    },

    updateActionStatus: (isactive, action_id) => {
        return format(`UPDATE ${dbtables.actions_config} SET isActive='${isactive}' WHERE action_id='${action_id}'`);
    },
    deleteAction: (action_id) => {
        return format(`DELETE FROM ${dbtables.actions_config} where action_id='${action_id}'`);
    },
    getAllTestCases: (aut) => {
        return format(`SELECT * FROM ${dbtables.testcases} where aut = ${aut}`);
    },

    getTestCase: (testid, aut) => {
        return format(`select * from ${dbtables.testcases} where aut = ${aut} and test_case_id = ${testid}`)

    },
    createGroup: (testgroupname, testids, aut) => {
        return format(`WITH i as (
            INSERT INTO ${dbtables.TestCaseGroup} (TestGroupName,aut )
            VALUES ('${testgroupname}',${aut})
            RETURNING *
            )
            INSERT INTO ${dbtables.GroupMapping} (aut,TestCaseGroupId,testid)
            SELECT i.aut,i.TestCaseGroupId,g.testids
            FROM (VALUES  ${testids}) g(testids) CROSS JOIN
            i`);
    },
    getGroupMappings: (testcasegroupid, aut) => {
        return format(`SELECT ${dbtables.GroupMapping}.testgroupmappingid, ${dbtables.GroupMapping}.testid, 
                        ${dbtables.GroupMapping}.testcasegroupid, ${dbtables.testcases}.testcasename, 
                        ${dbtables.TestCaseGroup}.testgroupname, ${dbtables.GroupMapping}.isActive
                        FROM ${dbtables.GroupMapping}
                        LEFT JOIN ${dbtables.testcases} 
                        ON ${dbtables.GroupMapping}.testid = ${dbtables.testcases}.test_case_id
                        LEFT JOIN ${dbtables.TestCaseGroup} 
                        ON ${dbtables.GroupMapping}.testgroupmappingid = ${dbtables.TestCaseGroup}.testcasegroupid  
                        WHERE ${dbtables.GroupMapping}.testcasegroupid = '${testcasegroupid}' and aut=${aut};`);
    },
    updateGroupMappingStatus: (isactive, testcasegroupid, testid) => {
        return format(`update ${dbtables.GroupMapping} set isactive='${isactive}' where testcasegroupid='${testcasegroupid}' and testid='${testid}'`);
    },
    updateGroupStatus: (isactive, testcasegroupid) => {
        return format(`update ${dbtables.TestCaseGroup} set isactive='${isactive}' where testcasegroupid='${testcasegroupid}'`);
    },
    getAllGroups: (aut) => {
        return format(`SELECT * FROM ${dbtables.TestCaseGroup} where aut=${aut};`);
    },
    getAllUsers: () => {
        return format(`select u.*,(select json_agg(json_build_object('autname',ad.autname)) from autmapping_dev am
        left join  aut_dev ad on ad.autid = am.autid
        where am.userid = u.userid ) as aut from users u order by u.userid `)

    },
    addAut: ({ autname, description, createdBy }) => {
        return format(`insert into aut_dev (autname,description,createdBy) values ('${autname}','${description}',${createdBy})`)
    },
    getAutQuery: format('select * from aut_dev')
}