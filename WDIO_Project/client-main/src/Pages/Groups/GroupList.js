import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import LoaderContext from '../../Context/LoaderContext';
import { APIKIT } from '../../helper/apis';
import { URLS } from '../../utlities/Url';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const GroupList = () => {

  const { addToast } = useToasts();
  const { setIsLoader } = useContext(LoaderContext);
  const [groups, setGroups] = useState([]);
  const [groupMappings, setGroupMappings] = useState([]);
  const [currentPanel, setCurrentPanel] = useState("");
  const [testcases, setTestCases] = useState([]);

  useEffect(() => {
    getGroups();
  }, [])

  const getGroups = async () => {
    setIsLoader(true)
    const resp = await APIKIT.get(URLS.getAllGroups);
    setIsLoader(false)
    if (resp.status === 200) {
      setGroups(resp.data);
    }
    else {
      addToast(resp.message, { appearance: 'error' });
    }
  }

  const getGroupMappings = async (testcasegroupid) => {
    setIsLoader(true)
    const resp = await APIKIT.get(URLS.getGroupMappings + '/' + testcasegroupid);
    setIsLoader(false)
    if (resp.status === 200) {
      setGroupMappings(resp.data);
    }
    else {
      addToast(resp.message, { appearance: 'error' });
    }
  }

  const updateGroupMappingStatus = async (groupId, testId, isActive) => {
    setIsLoader(true)
    const resp = await APIKIT.post(URLS.updateGroupMappingStatus + '/' + isActive + '/' + groupId + '/' + testId);
    setIsLoader(false)
    if (resp.status === 200) {
      addToast(isActive ? 'Group Mapping is Active' : 'Group Mapping is Inactive', { appearance: isActive ? 'success' : 'warning' });
      getGroupMappings(groupId);
    }
    else {
      addToast(resp.message, { appearance: 'error' });
    }
  }

  const updateGroupStatus = async(isActive, testcasegroupid) => {
    setIsLoader(true)
    const resp = await APIKIT.post(URLS.updateGroupStatus + '/' + isActive + '/' + testcasegroupid);
    setIsLoader(false)
    if (resp.status === 200) {
      addToast(isActive ? 'Group is Active' : 'Group is Inactive', { appearance: isActive ? 'success' : 'warning' });
      getGroups();
    }
    else {
      addToast(resp.message, { appearance: 'error' });
    }
  }

  return (
    <>
      <Paper elevation={3} >
        <Box component="div">
          {groups.map(group =>
            <Accordion key={group.testcasegroupid} expanded={group.testgroupname === currentPanel} onChange={() => {
              if (currentPanel != group.testgroupname) {
                setCurrentPanel(group.testgroupname);
                getGroupMappings(group.testcasegroupid);
              } else {
                setCurrentPanel("");
              }
            }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Grid  container spacing={2}>
                  <Grid item xs={8}>
                    <Typography style={{ marginTop: "5px", }}>
                      {group.testgroupname}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: "end", }}>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                      <Button color='secondary' variant='outlined' style={{ textAlign: "end", }}
                        onClick={() => {updateGroupStatus(!group.isactive, group.testcasegroupid);}}>
                          {group.isactive ? 'Inactive' : 'Active'}
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Paper style={{ marginTop: "10px" }} elevation={3} >
                    {groupMappings.map(groupMapping => (
                      <Box component="div" key={groupMapping.testid}
                        sx={{ p: 1, border: '1px dashed grey', marginTop: '1px' }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={8}>
                            <Typography style={{ marginTop: "5px", }}>
                              {groupMapping.testcasename}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} style={{ textAlign: "end", }}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                              <Button color="secondary" size='small' variant='outlined' disabled>Edit</Button>
                              <Button color='warning' size='small' variant='outlined' onClick={() => { updateGroupMappingStatus(groupMapping.testcasegroupid, groupMapping.testid, !groupMapping.isactive) }} >{groupMapping.isactive ? 'Inactive' : 'Active'}</Button>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                  </Paper>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      </Paper>
    </>
  )
}

GroupList.propTypes = {};

GroupList.defaultProps = {};

export default GroupList;