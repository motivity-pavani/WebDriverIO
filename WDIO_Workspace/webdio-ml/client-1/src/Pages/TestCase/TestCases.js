import { Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import TestCaseCreate from './TestCaseCreate';
import TestCasesList from './TestCasesList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const TestCases = () => {
  const [value, setValue] = React.useState(0);
  const [test_Id, setTest_Id] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };
  return <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Create Test Cases" {...a11yProps(0)} />
        <Tab label="Test Cases List" {...a11yProps(1)} />
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
      <TestCaseCreate test_Id={test_Id} setTest_Id={setTest_Id} />
    </TabPanel>
    <TabPanel value={value} index={1}>
      <TestCasesList setTest_Id={setTest_Id} handleChange={handleChange} />
    </TabPanel>
  </Box>
}

export default TestCases;