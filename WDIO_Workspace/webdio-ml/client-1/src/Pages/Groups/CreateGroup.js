import React, { useContext, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { APIKIT } from '../../helper/apis';
import { URLS } from '../../utlities/Url';
import Box from '@mui/material/Box';
import { Button, Checkbox, FormControlLabel, Grid, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material';
import LoaderContext from '../../Context/LoaderContext';
import { getUser } from '../../utlities/userDetails';


const CreateGroup = () => {

  const [payload, setPayload] = useState({ groupName: '', aut: getUser().autname, testcases: [], });
  const [testCases, setTestCases] = useState([]);
  const [showSavebutton, setShowSavebutton] = useState(false);
  const { setIsLoader } = useContext(LoaderContext);
  const { addToast } = useToasts();
  useEffect(() => {
    getAllTestCases();
  }, []);

  const getAllTestCases = async () => {
    setIsLoader(true);
    const resp = await APIKIT.get(URLS.getAllTestCaseswithoutAbstract);
    setIsLoader(false);
    if (resp.status === 200) {
      setTestCases(resp.data);
    }
    else {
      addToast(resp.message, { appearance: 'error' });
    }
  };

  const createGroup = async (testgroupname, testids) => {
    setIsLoader(true);
    const resp = await APIKIT.post(URLS.createGroup + '/' + testgroupname + '/' + testids);
    setIsLoader(false);
    getAllTestCases();
    if (resp.status === 200) {
      setTestCases(resp.data);
    }
    else {
      addToast(resp.message, { appearance: 'error' });
    }
  }

  const reset = () => {
    setPayload({
      groupName: '',
    })
  }

  return (
    <>
      <Paper elevation={3} square >
        <Box
          component="div"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '35ch' },
          }}
        >
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Test Suite Name"
            value={payload.groupName}
            onChange={(e) => {
              setPayload({
                ...payload,
                groupName: e.target.value,
              })
            }}
          />
          <TextField
            fullWidth
            required
            disabled
            id="outlined-required"
            label="Aut"
            value={payload.aut}
            onChange={(e) => {
              setPayload({
                ...payload,
                aut: e.target.value,
              })
            }}
          />
          <>
            {console.log(testCases)}
            {testCases && testCases.length > 0 ? testCases.map(x =>
              <>
                <br />
                <Grid container spacing={2} alignItems="baseline">
                  <Grid item xs={4}>
                    <Typography style={{ marginLeft: "50px", }}>
                      {x.testcasename}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} style={{ textAlign: "end", }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Checkbox onClick={(e) => {
                        if (e.target.checked) {
                          payload.testcases.push(x.test_case_id);
                        } else {
                          payload.testcases.splice(payload.testcases.indexOf(x.test_case_id), 1)
                        }
                        if (payload.testcases.length > 1) {
                          setShowSavebutton(true)
                        } else {
                          setShowSavebutton(false)
                        }
                      }} />
                    </Stack>
                  </Grid>
                </Grid>
              </>
            ) : null}
            <Grid container spacing={2} direction="row" justifyContent="flex-end" alignItems="flex-end" >
              <Grid item xs={1} style={{ marginBottom: "5px" }}>
                <Button variant='contained' onClick={() => {
                  let testIdString = payload.testcases.map(id => `(${id})`).join(',');
                  createGroup(payload.groupName, testIdString);
                  reset();
                }} disabled={!(payload.groupName !== '' && payload.aut !== '' && showSavebutton)}>Save</Button>
              </Grid>
            </Grid>
          </>
        </Box>
      </Paper>
    </>
  );
}

CreateGroup.propTypes = {};

CreateGroup.defaultProps = {};

export default CreateGroup;
