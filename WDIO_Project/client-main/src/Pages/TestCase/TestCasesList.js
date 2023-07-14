import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import LoaderContext from '../../Context/LoaderContext';
import { APIKIT } from '../../helper/apis';
import { URLS } from '../../utlities/Url';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TreeView from '@mui/lab/TreeView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { treeviewBuildData } from '../../utlities/utility';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  treeTitle: {
    '& .MuiTreeItem-label': {
      lineHeight: 2.5,
    },
  }
})

const TestCasesList = ({ handleChange, setTest_Id }) => {
  const classes = useStyles();
  const [currentPanel, setCurrentPanel] = useState("")
  const { addToast } = useToasts();
  const { setIsLoader } = useContext(LoaderContext);
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    getActionList();
  }, [])

  const getActionList = async () => {
    setIsLoader(true)
    const resp = await APIKIT.get(URLS.getAllTestCases);
    setIsLoader(false)
    if (resp.status === 200) {
      resp.data.forEach(element => {
        element.tree = treeviewBuildData(element)

      });
      setTestCases(resp.data);
    }
    else {
      addToast(resp.message, { appearance: 'error' });
    }
  };

  // console.log(data,"test");
  return (
    <>
      <Paper elevation={3} >
        <Box component="div">
          {testCases.map(testCase =>
            <Accordion key={testCase.test_case_id} expanded={testCase.testcasename === currentPanel} onChange={() => {
              if (currentPanel != testCase.testcasename) {
                setCurrentPanel(testCase.testcasename);
              } else {
                setCurrentPanel("");
              }
            }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{testCase.testcasename}</Typography>

              </AccordionSummary>
              <AccordionDetails>
                <Button variant="contained" style={{ marginBottom: "10px", float: "right" }} onClick={() => {
                  setTest_Id(testCase.test_case_id)
                  handleChange('', 0)
                }}>Edit</Button>
                <Button variant="contained" style={{ marginRight: "5px", marginBottom: "10px", float: "right" }} onClick={async () => {
                  const resp = await APIKIT.get(URLS.deleteTestCase + testCase.test_case_id);
                  if (resp.status === 200) {
                    addToast(resp.message, { appearance: 'success' });
                    getActionList();
                  }
                  else {
                    addToast(resp.message, { appearance: 'error' });
                  }
                }}
                >Delete</Button>
                <TreeView
                  aria-label="rich object"
                  defaultExpanded={['root']}
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                >
                  {testCase.tree && testCase.tree.map((t, index) =>
                    <TreeItem key={t.node} className={classes.treeTitle} nodeId={t.node}
                      label={t.name === 'testcasefixturesteps' ? 'Test Case Fixture Steps' :
                        t.name === 'testcasesteps' ? 'Test Case Steps' : 'Test Case Closure Steps'}>
                      {t.list.map((l, sindex) =>
                        <TreeItem className={classes.treeTitle} key={l.node} nodeId={l.node} label={l.name} >
                          {l.list.map((x) =>
                            <TreeItem className={classes.treeTitle} key={x.node} nodeId={x.node} label={
                              <>
                                <b>{x.name}:</b>  {x.value}
                              </>
                            }>
                            </TreeItem>)}
                        </TreeItem>)}
                    </TreeItem>)}
                </TreeView>
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      </Paper>
    </>
  )
}

export default TestCasesList;