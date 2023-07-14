import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import { APIKIT } from '../../helper/apis';
import { URLS, lookupIds } from '../../utlities/Url';
import LoaderContext from '../../Context/LoaderContext';
import { useToasts } from 'react-toast-notifications';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from '@mui/material';
import { getUser } from '../../utlities/userDetails';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #e0e0e0"
}));

export default function ChooseTestCases() {
    const { addToast } = useToasts();
    const { setIsLoader } = useContext(LoaderContext);
    const [testcasesList, setTestcasesList] = useState([]);
    const [groupsList, setGroupsList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getTestcasesList();
        // getGroupsList();
        // getSelectedTestCases();
    }, [])

    useEffect(() => {
        if (testcasesList.length && selectedList.length) {
            let list = testcasesList.filter(x => !selectedList.find(y => y.typeid === 1 && y.executiondetailsid === x.test_case_id));
            setTestcasesList(list)
            setIsLoading(true)

        }
        if (groupsList.length && selectedList.length) {
            let list = groupsList.filter(x => !selectedList.find(y => y.typeid === 2 && y.executiondetailsid === x.testcasegroupid));
            setGroupsList(list)
            setIsLoading(true)
        }
        setIsLoading(true)
    }, [selectedList])


    const getTestcasesList = async () => {
        setIsLoader(true)
        const resp = await APIKIT.get(URLS.getAllTestCaseswithoutAbstract);
        setIsLoader(false)
        if (resp.status === 200) {
            setTestcasesList(resp.data)
            getGroupsList();
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }
    const getGroupsList = async () => {
        setIsLoader(true)
        const resp = await APIKIT.get(URLS.getGroupsList);
        setIsLoader(false)
        if (resp.status === 200) {
            setGroupsList(resp.data)
            getSelectedTestCases()
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }
    const getSelectedTestCases = async () => {
        setIsLoader(true)
        const resp = await APIKIT.get(URLS.getSelectedTestCasesList);
        setIsLoader(false)
        if (resp.status === 200) {
            setSelectedList(resp.data)
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }
    const addSelecttestCases = async (payload) => {
        setIsLoader(true)
        const resp = await APIKIT.post(URLS.addselectedTestCases, payload);
        setIsLoader(false)
        if (resp.status === 200) {
            setIsLoading(false)
            getTestcasesList();
            addToast(resp.message, { appearance: 'success' });
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }

    const updateStatus = async (payload, index) => {
        setIsLoader(true)
        const resp = await APIKIT.post(URLS.selectedTestCasesUpdate, payload);
        setIsLoader(false)
        if (resp.status === 200) {
            payload.isactive = !payload.isactive;
            const list = [...selectedList];
            list[index] = payload;
            setSelectedList(list)
            addToast(resp.message, { appearance: 'success' });
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }

    const deleteSelectedTestCases = async (payload) => {
        // console.log(payload)
        setIsLoader(true)
        const resp = await APIKIT.post(URLS.deleteSelectTestCase, payload);
        setIsLoader(false)
        if (resp.status === 200) {
            setIsLoading(false)
            getTestcasesList();
            addToast(resp.message, { appearance: 'success' });
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }


    return <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Box sx={{ textAlign: "right" }}>
                    <Button
                        disabled={!selectedList.filter(row => row.isactive).length}
                        variant="contained" onClick={async (e) => {
                            setIsLoader(true)
                            const resp = await APIKIT.get(URLS.runTestCases);
                            setIsLoader(false)
                            if (resp.status === 200) {
                                setIsLoading(false)
                                getTestcasesList();
                                addToast(resp.message, { appearance: 'success' });
                            }
                            else {
                                addToast(resp.message, { appearance: 'error' });
                            }
                        }}>Run Test Case</Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={3}>
                <Typography sx={{ mb: 2 }} variant="h6" component="div">
                    Test Suites
                </Typography>
                {isLoading ? <Demo>
                    {/* <TextField sx={{ m: 1, width: "90%" }} label="search" id="fullWidth" /> */}
                    <List dense={true}>
                        {groupsList.map(group =>
                            <ListItem
                                key={group.testcasegroupid}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <Avatar>
                                            <ArrowForwardIcon onClick={(e) => {
                                                let obj = {
                                                    typeid: 2,
                                                    executiondetailsid: group.testcasegroupid
                                                }
                                                addSelecttestCases(obj)

                                            }} />
                                            {/* <FolderIcon /> */}
                                        </Avatar>
                                    </IconButton>
                                }
                            >
                                {/* <ListItemAvatar>
                                    <Avatar>
                                        <ArrowBackIcon onClick={(e) => {
                                            let obj = {
                                                typeid: 2,
                                                executiondetailsid: group.testcasegroupid
                                            }
                                            addSelecttestCases(obj)

                                        }} />
                                    </Avatar>
                                </ListItemAvatar> */}
                                <ListItemText
                                    primary={group.testgroupname}
                                    secondary={getUser().autname}
                                />
                            </ListItem>,
                        )}
                    </List>
                </Demo> : <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="success" />
                </Stack>}
            </Grid>
            <Grid item xs={12} md={3}>
                <Typography sx={{ mb: 2 }} variant="h6" component="div">
                    Test Cases
                </Typography>
                {isLoading ? <Demo>
                    {/* <TextField sx={{ m: 1, width: "90%" }} label="search" id="fullWidth"
                        endAdornment={<SearchIcon />} /> */}
                    <List dense={true}>
                        {testcasesList.map(testcases =>
                            <ListItem
                                key={testcases.test_case_id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <Avatar>
                                            <ArrowForwardIcon onClick={(e) => {
                                                let obj = {
                                                    typeid: 1,
                                                    executiondetailsid: testcases.test_case_id
                                                }
                                                addSelecttestCases(obj)

                                            }} />
                                        </Avatar>
                                    </IconButton>
                                }
                            >
                                {/* <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar> */}
                                <ListItemText
                                    primary={testcases.testcasename || "-"}
                                    secondary={getUser().autname}
                                />
                            </ListItem>
                        )}
                    </List>
                </Demo> : <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="success" />
                </Stack>}
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography sx={{ mb: 2 }} variant="h6" component="div">
                    Selected Test Suites and Testcases
                </Typography>
                {isLoading ? <Demo>
                    {/* <TextField sx={{ m: 1, width: "90%" }} label="search" id="fullWidth" /> */}
                    <List dense={true}>
                        {selectedList.map((test, index) =>
                            <ListItem
                                key={test.selecttestid}
                                secondaryAction={
                                    <>
                                        <IconButton edge="end" aria-label="delete">
                                            <Avatar style={{
                                                background: test.isactive ? "green" : "red"
                                            }}>
                                                {!test.isactive ? <ThumbDownOffAltIcon onClick={(e) => updateStatus(test, index)} /> : <ThumbUpOffAltIcon onClick={(e) => updateStatus(test, index)} />}
                                            </Avatar>
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete">
                                            <Avatar>
                                                <DeleteIcon onClick={(e) => deleteSelectedTestCases(test)} />
                                            </Avatar>
                                        </IconButton>
                                    </>
                                }
                            >
                                {/* <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar> */}
                                <ListItemText
                                    primary={test.actionname}
                                    secondary={test.typename}
                                />
                            </ListItem>,
                        )}
                    </List>
                </Demo> : <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="success" />
                </Stack>}
            </Grid>

        </Grid>
    </Box>
}