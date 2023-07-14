CREATE TABLE IF NOT EXISTS TestCaseGroup
(
TestCaseGroupId serial PRIMARY KEY,
TestGroupName VARCHAR ( 100 ) NOT NULL,
isActive BOOLEAN DEFAULT true,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)




CREATE TABLE IF NOT EXISTS GroupMapping
(
TestGroupMappingId serial PRIMARY KEY,
testid INT NOT NULL,
TestCaseGroupId INT not null,
isActive BOOLEAN DEFAULT true,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)