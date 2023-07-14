import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import {
  Accordion, AccordionDetails, AccordionSummary,
  Button, Grid, Paper, Stack, Typography
} from '@mui/material';
import { URLS } from '../../utlities/Url';
import { APIKIT } from '../../helper/apis';
import LoaderContext from '../../Context/LoaderContext';
import { useToasts } from 'react-toast-notifications';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ActionsList = ({ setEditActionId, handleChange }) => {

  const { addToast } = useToasts();
  const { setIsLoader } = useContext(LoaderContext);
  const [pages, setPages] = useState([]);
  const [currentPanel, setCurrentPanel] = useState("")
  const [actions, setActions] = useState([]);

  useEffect(() => {
    getActionList();
  }, []);

  const getActionList = async () => {
    setIsLoader(true)
    const resp = await APIKIT.get(URLS.getActionPagesList);
    setIsLoader(false)
    if (resp.status === 200) {
      setPages(resp.data);
    }
    else {
      addToast(resp.message, { appearance: 'error' });
    }
  };

  const selectPage = async (pagename) => {
    setIsLoader(true);
    const resp = await APIKIT.get(URLS.getActionListBypageName + '/' + pagename);
    setIsLoader(false);
    if (resp.status === 200) {
      setActions(resp.data);
    }
    else {
      addToast(resp.message, { appearance: 'error' });
    }
  }

  const setInactiveAction = async (isactive, action_id, page_name) => {
    setIsLoader(true);
    const response = await APIKIT.post(URLS.inactiveAction + '/' + isactive + '/' + action_id);
    setIsLoader(false);
    if (response.status === 200) {
      addToast(isactive ? 'Action is Active!' : 'Action is Inactive!', { appearance: isactive ? 'success' : 'warning' });
      selectPage(page_name);
    } else {
      addToast(response.message, { appearance: 'error' });
    }
  }

  const deleteAction = async (action_id) => {
    setIsLoader(true);
    await APIKIT.get(URLS.deleteAction + '/' + action_id);
    setIsLoader(false);
  }



  return (
    <>
      <Paper elevation={3} >
        <Box component="div">
          {pages.map(page =>
            <Accordion expanded={page.page_name === currentPanel} onChange={() => {
              if (currentPanel != page.page_name) {
                setCurrentPanel(page.page_name);
                selectPage(page.page_name);
              } else {
                setCurrentPanel("");
              }
            }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{page.page_name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Paper style={{ marginTop: "10px" }} elevation={3} >
                    {actions.map(action => (
                      <Box component="div" key={action.action_name}
                        sx={{ p: 1, border: '1px dashed grey', marginTop: '1px' }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={8}>
                            <Typography style={{ marginTop: "5px", }}>
                              {action.action_name}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} style={{ textAlign: "end", }}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                              <Button color="secondary" size='small' variant='outlined' onClick={(e) => {
                                setEditActionId(action.action_id)
                                handleChange("", 0)

                              }}>Edit</Button>
                              <Button color='warning' size='small' variant='outlined' onClick={() => { setInactiveAction(!action.isactive, action.action_id, page.page_name) }}>{action.isactive ? 'Inactive' : 'active'}</Button>
                              {/* <Button color='error' size='small' variant='outlined' onClick={() => { deleteAction(action.action_id) }}>Delete</Button> */}
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
      {/* <Dialog open={openEditDialog} maxWidth={"md"} onClose={handleClose}>
        <DialogTitle>Edit Action</DialogTitle>
        <DialogContent>
          <div key={"ac"}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Action Name"
              value={"ss"}
              onChange={(e) => {}}
            />
            <TextField
              style={{ width: 150 }}
              required
              id="outlined-required"
              label="No Of Fields"
              value={"ss"}
              onChange={(e) => {}}
            />

            <Button
              style={{
                marginLeft: "15px",
                marginTop: "15px"
              }} variant="contained" onClick={(e) => {
              }}  >Action parameters</Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog> */}
    </>
  )
}



ActionsList.propTypes = {};

ActionsList.defaultProps = {};

export default ActionsList;
