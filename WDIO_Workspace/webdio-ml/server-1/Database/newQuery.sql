CREATE TABLE users (
	userID serial PRIMARY KEY,
	Name VARCHAR ( 50 )  NOT NULL,
	password VARCHAR ( 150 ) NOT NULL,
	Email VARCHAR ( 255 ) UNIQUE NOT NULL,
	isActive BOOLEAN DEFAULT true,
	isVerify BOOLEAN DEFAULT true,
	createdAt TIMESTAMP  WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


select * from users

create or replace procedure USP_CREATE_USER(
   Name VARCHAR ( 50 ),
   password VARCHAR ( 150 ), 
   currentEmail VARCHAR ( 255 )
)
language plpgsql    
as $$
begin
   IF EXISTS (SELECT 1  FROM users u where u.Email = currentEmail ) THEN
    RAISE EXCEPTION 'Email Already Exist';
   ELSE
     insert into users (Name,password,Email) values(Name,password,currentEmail);
   END IF;
 
end;$$


	create Table lookup (
		id serial PRIMARY KEY,
		title  VARCHAR ( 50 )  NOT NULL,
		full_name VARCHAR ( 50 )  NOT NULL,
		isActive BOOLEAN DEFAULT true,
		parent_id int ,
		createdAt TIMESTAMP  WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
		createdBy INT
	);

	insert into lookup  (title,full_name,parent_id,createdBy)
	values ('types','types',0,1);
	
	insert into lookup  (title,full_name,parent_id,createdBy)
	values ('Test Pre Req','Test Pre Req',1,1);
	
	insert into lookup  (title,full_name,parent_id,createdBy)
	values ('Test Steps','Test Steps',1,1);
	
	insert into lookup  (title,full_name,parent_id,createdBy)
	values ('Test Closure','Test Closure',1,1);



create or replace function get_lookup (
  selected_id INT
) 
	returns table (
		id INT,
		title  VARCHAR ( 50 ),
		full_name VARCHAR ( 50 ),
		isActive BOOLEAN,
		parent_id int ,
		createdAt TIMESTAMP WITH TIME ZONE,
		createdBy INT
	) 
	language plpgsql
as $$
begin
	return query 
		select
			l.*
		from
			lookup l
		where
			l.parent_id = selected_id and l.isActive = true;
end;$$
	
select * from actions_config
	create table actions_config  (
	action_id serial PRIMARY KEY,
	page_name  VARCHAR ( 50 )  NOT NULL,
	aut VARCHAR ( 50 )  NOT NULL,
	action_name VARCHAR ( 50 ),
	sub_action_name VARCHAR ( 50 ),
	action_parameters JSON,
	sub_action_parameters JSON,
	noOfFields INT,
	subActionNoOfFields INT,
	isActive BOOLEAN DEFAULT true,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	createdBy INT,
	updatedAt TIMESTAMP,
	updateBy INT 
	)
	
	select * from actions_config
	
	SELECT
   DISTINCT page_name
FROM
   actions_config;
  
  
  select * from actions_config where page_name='loginPage'
  
  select * from get_lookup(1)
  
  	create Table testcases (
		test_case_id serial PRIMARY KEY,
		TestcaseName VARCHAR ( 50 )  NOT NULL,
		aut  VARCHAR ( 50 )  NOT NULL,
		TestCaseFixtureSteps JSON NOT NULL,
		TestCaseSteps JSON NOT NULL,
		TestCaseValidationSteps JSON,
		TestCaseClosureSteps JSON,
		totalPayload JSON,
		isActive BOOLEAN DEFAULT true,
		status BOOLEAN DEFAULT true,
		LastRunAt  TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
		createdAt TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
	    createdBy INT,
	    updatedAt TIMESTAMP,
	    updateBy INT 
	)
	
	  	create Table testcases_dev (
		test_case_id serial PRIMARY KEY,
		TestcaseName VARCHAR ( 50 )  NOT NULL,
		aut  VARCHAR ( 50 )  NOT NULL,
		TestCaseFixtureSteps JSON NOT NULL,
		TestCaseSteps JSON NOT NULL,
		TestCaseValidationSteps JSON,
		TestCaseClosureSteps JSON,
		totalPayload JSON,
		isActive BOOLEAN DEFAULT true,
		status BOOLEAN DEFAULT true,
		LastRunAt  TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
		createdAt TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
	    createdBy INT,
	    updatedAt TIMESTAMP,
	    updateBy INT 
	)

  
  select * from selecttests s 
  select * from testcases_dev where testcasename not ilike  '%abstract%'
  SELECT version();
  
   select * from testcases_dev 
  
  select * from TestCaseGroup
  
  
  select * from testcasesmaster t 
  
  
  select * from SelectTests where isactive = true
  
  { "browserPage_NavigateToUrl":{"url":"https://efficience-dev.tbb.technology/#/hub"},
"efficienceLoginPage_efficienceLogin":{"username":"jphani","password":"This!sDef@u1t","selectGroup":"System Admin"} }
{ 
"browserPage_goToMenu":{"menuItem":"LEADS"} ,
"leadsPage_filladdAccountDetailsAndSave":{"accountName":"", "tpaName":"Motivity TPA US Test1", "businessName":"Testing", "entityType": "LLC", "industry":"Employment Services", "autoNachaDay":"", "addressLine1":"Golden Gate Bridge", "addressLine2":"San Francisco County", "city":"San Francisco", "state":"CA", "country":"United States", "zip":"54515", "annualrevenue":"100000", "numberofemployees":"100", "yearsOfbusiness":"3", "payrollfrequency":"Weekly"}
 }
 
 { "browserPage_NavigateToUrl":{"url":"https://efficience-dev.tbb.technology/#/hub"} }
 { "efficienceLoginPage_efficienceLogin":{"username":"jphani","password":"This!sDef@u1t","selectGroup":"System Admin"} }
 
 { "efficienceLoginPage_efficienceLogin":{"username":"jphani","password":"This!sDef@u1t","selectGroup":"System Admin"} }
 
 {"loginPage_login":{"username":"LL","password":"YY"}}
 
 insert into TestCaseGroup (TestGroupName) values ('xyzxcv')
RETURNING TestCaseGroupId;
 
select * from TestCaseGroup


with rows as (
insert into TestCaseGroup (TestGroupName) values ('xyzxcv') RETURNING TestCaseGroupId
)
INSERT INTO  (TestCaseGroupId,testid) SELECT
    rows.id
    , v.val
  FROM rows, (VALUES (1), (2), (3)) v(val);
FROM rows

select * from GroupMapping;


WITH i as (
      INSERT INTO TestCaseGroup (TestGroupName)
          VALUES ('ASHOK0012')
          RETURNING *
     )
INSERT INTO GroupMapping (TestCaseGroupId,testid) 
    SELECT  i.TestCaseGroupId,g.testids
    FROM (VALUES (45), (46), (47)) g(testids) CROSS JOIN
         i
         
         select * from  TestCaseGroup 
         
         select * from GroupMapping
         
         select * from testcasegroup where isactive = true and testgroupname ilike  '%ash%'

         select test_case_id ,testcasename,aut,isactive from testcases_dev   where isactive = true and testcasename ilike  '%-%'
         
         select s.selecttestid ,s.typeid,s.executiondetailsid,
           CASE WHEN s.TypeID = 1 THEN 'testcase'
                                            WHEN s.TypeID = 2 THEN 'group'
                                            ELSE '' END
                                            AS typename,
             CASE WHEN s.TypeID = 1 THEN (select tcm.testname from testcasesmaster tcm where tcm.testid = s.ExecutionDetailsID)
         WHEN s.TypeID = 2 THEN (select tcg.TestGroupName from TestCaseGroup tcg where tcg.TestCaseGroupId = s.ExecutionDetailsID)
         ELSE '' end
         as actionname
         from selecttests s 
         
         select * from selecttests s 
         
         update selecttests set isactive = false where selecttestid = 1
         
         CREATE TABLE IF NOT EXISTS TestCaseGroup_dev
(
TestCaseGroupId serial PRIMARY KEY,
TestGroupName VARCHAR ( 100 ) NOT NULL,
isActive BOOLEAN DEFAULT true,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS GroupMapping_dev
(
TestGroupMappingId serial PRIMARY KEY,
testid INT NOT NULL,
TestCaseGroupId INT not null,
isActive BOOLEAN DEFAULT true,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
drop table SelectTests_dev

CREATE TABLE IF NOT exists aut_dev
(
autid  serial PRIMARY KEY,
autname  VARCHAR ( 50 ) UNIQUE NOT NULL,
description  VARCHAR ( 50 ),
isActive BOOLEAN DEFAULT true,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
createdBy INT,
updatedAt TIMESTAMP,
updateBy INT
)

CREATE TABLE IF NOT exists autmapping_dev
(
autmappingid  serial PRIMARY KEY,
autid INT not null,
userid INT not null,
isActive BOOLEAN DEFAULT true,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
createdBy INT,
updatedAt TIMESTAMP,
updateBy INT
)


select s.selecttestid ,s.typeid,s.executiondetailsid,s.isactive,
            CASE WHEN s.TypeID = 1 THEN 'testcase'
            WHEN s.TypeID = 2 THEN 'group'
            ELSE '' END
            AS typename,
            CASE WHEN s.TypeID = 1 THEN (select tcm.TestcaseName from testcases_dev tcm where tcm.test_case_id = s.ExecutionDetailsID)
            WHEN s.TypeID = 2 THEN (select tcg.TestGroupName from TestCaseGroup_dev tcg where tcg.TestCaseGroupId = s.ExecutionDetailsID)
            ELSE '' end
            as actionname
            from selecttests_dev s

            
            select * from testcases_dev td 
            delete from   testcases_dev where test_case_id = 3
      
            
            select * from SelectTests_dev
 
            
            select st.SelectTestID,st.TypeID,st.ExecutionDetailsID,
                                                CASE WHEN st.TypeID = 1 THEN 'testcase'
                                                    WHEN st.TypeID = 2 THEN 'group'
                                                    ELSE '' END
                                                    AS typename,
                                                CASE WHEN st.TypeID = 1 THEN (select tcm.TestcaseName   from testcases_dev tcm where tcm.test_case_id = st.ExecutionDetailsID)
                                                    WHEN st.TypeID = 2 THEN (select tcg.TestGroupName from TestCaseGroup_dev tcg where tcg.TestCaseGroupId = st.ExecutionDetailsID)
                                                    ELSE '' end
                                                    as actionname,
                                                        CASE WHEN st.TypeID = 1 THEN null
                                                    WHEN st.TypeID = 2 THEN (select json_agg(json_build_object('testid',gm.testid,'testname',tcm.TestcaseName)) as testcasesGroupList from GroupMapping_dev gm 
                                                    left join testcases_dev tcm on tcm.test_case_id = gm.testid
                                                    where gm.TestCaseGroupId = st.ExecutionDetailsID 
                                                    and gm.testid not in  (select sst.executiondetailsid from selecttests_dev sst where sst.typeid = 1 and sst.isactive = true ) )
                                                    ELSE null end
                                                    as groupinlist         
                                            from selecttests_dev  st where st.isactive = true order  by st.SelectTestID
                                            
                                            
                                            
TRUNCATE TABLE actions_config 
RESTART IDENTITY;
TRUNCATE TABLE testcases_dev 
RESTART IDENTITY;
TRUNCATE TABLE TestCaseGroup_dev 
RESTART IDENTITY;
TRUNCATE TABLE GroupMapping_dev 
RESTART IDENTITY;

TRUNCATE TABLE SelectTests_dev 
RESTART IDENTITY;

select * from testcasesmaster t 

{ "browserPage_NavigateToUrl":{"url":"https://efficience-dev.tbb.technology/#/hub"},
"efficienceLoginPage_efficienceLogin":{"username":"jphani","password":"This!sDef@u1t","selectGroup":"System Admin"} }

{ 
"browserPage_goToMenu":{"menuItem":"LEADS"} ,
"leadsPage_filladdAccountDetailsAndSave":{"accountName":"", "tpaName":"Motivity TPA US Test1", "businessName":"Testing", "entityType": "LLC", "industry":"Employment Services", "autoNachaDay":"", "addressLine1":"Golden Gate Bridge", "addressLine2":"San Francisco County", "city":"San Francisco", "state":"CA", "country":"United States", "zip":"54515", "annualrevenue":"100000", "numberofemployees":"100", "yearsOfbusiness":"3", "payrollfrequency":"Weekly"}
 }
            
            
 
 select * from users u 
 
 s
 
 select * from testcases_dev td  where test_case_id  in 
 
 select * from actions_config ac where page_name = 'efficienceLoginPage33' and action_name ='efficienceLogindd';
 select * from actions_config ac where page_name = 'efficienceLoginPage' and action_name ='efficienceLogin';

select * from testcases_dev td  where testcasename = 'Add Account'
{"browserPage_NavigateToUrl":{"url":"https://efficience-dev.tbb.technology/#/hub"},"efficienceLoginPage_efficienceLogin":{"username":"jphani","password":"This!sDef@u1t","selectGroup":"System Admin"}}
 
            