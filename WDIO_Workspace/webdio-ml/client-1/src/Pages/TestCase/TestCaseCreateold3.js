import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { APIKIT } from '../../helper/apis';
import { URLS, lookupIds } from '../../utlities/Url';
import { useEffect, useContext, useState } from 'react';
import LoaderContext from '../../Context/LoaderContext';
import { useToasts } from 'react-toast-notifications';
import { testCaseBuildPayload } from '../../utlities/utility';
import { getUser } from '../../utlities/userDetails';

const useStyles = makeStyles({
    icon: {
        marginTop: "20px",
        marginLeft: "10px",
        cursor: "pointer"
    }
})


export default function TestCaseCreate({ test_Id, setTest_Id }) {
    const { addToast } = useToasts();
    const { setIsLoader } = useContext(LoaderContext);
    const [listType, setListTypes] = useState([]);
    const [actionsList, setActionsList] = useState([]);
    const [stepsPayload, setStepsPayload] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [totalSteps, setTotalSteps] = useState(1);
    const [payloadTitle, setPayloadTitle] = useState({
        testCaseName: "",
        aut: getUser().autname,
    });
    const [pagesList, setPagesList] = useState([])
    const [showMethod, setShowMethod] = useState(false);
    const [payload, setPayload] = useState({
        type: {
            type_id: null,
            type_name: "",
        },
        methodsList: [{
            event: "",
            type: "action",
            id: null,
            page_name: "",
            actions: [],
            method: "",
            no_of_fields: null,
            fields: [],
        }],
    });
    const [abstractTestCases, setAbstractTestCases] = useState([]);

    const [newMethods, setNewMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState('');
    const classes = useStyles();

    useEffect(() => {
        getTypes();
        getActionList();
        getAbstractTestCases()
    }, [])
    useEffect(() => {
        if (test_Id) {
            getTestCase()
        }
    }, [test_Id])

    // Edit
    const getTestCase = async () => {
        setIsLoader(true)
        const resp = await APIKIT.get(`${URLS.getTestCases}/${test_Id}`);
        setIsLoader(false)
        if (resp.status === 200) {
            let testCaseData = resp.data[0] // resp.data.find(row => row.test_case_id === test_Id)
            setStepsPayload(testCaseData.totalpayload)
            setTotalSteps(testCaseData.totalpayload.length)
            setPayload(testCaseData.totalpayload[0])
            setPayloadTitle({
                ...payloadTitle,
                testCaseName: testCaseData.testcasename
            })

        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    };
    //Edit

    const reset = () => {
        setPayloadTitle({
            testCaseName: "",
            aut: "",
        })
        setPayload({
            type: {
                type_id: null,
                type_name: ""
            },
            methodsList: [{
                event: "",
                type: "action",
                id: null,
                page_name: "",
                actions: [],
                method: "",
                no_of_fields: null,
                fields: [],
            }],

        })
        setTotalSteps(1)
        setCurrentStep(0)
        setStepsPayload([])
        setTest_Id(null)
    }
    const AddTestCase = async (values) => {
        setIsLoader(true)
        if (test_Id) {
            values.test_case_id = test_Id;
        }
        const resp = await APIKIT.post(test_Id === null ? URLS.addTestcase : URLS.updateTestCases, values);
        setIsLoader(false)
        if (resp.status === 200) {
            addToast(resp.message, { appearance: 'success' });
            reset()
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }

    const getTypes = async () => {
        setIsLoader(true)
        const resp = await APIKIT.get(URLS.getLookup + lookupIds.TYPES);
        setIsLoader(false)
        if (resp.status === 200) {
            setListTypes(resp.data)
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }
    const getActionList = async () => {
        setIsLoader(true)
        const resp = await APIKIT.get(URLS.getActionPagesList);
        setIsLoader(false)
        if (resp.status === 200) {
            setPagesList(resp.data)
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }
    const selectPage = async (e, methodRow, index) => {
        setIsLoader(true)
        const resp = await APIKIT.get(URLS.getActionListBypageName + '/' + e.target.value);
        setIsLoader(false)
        if (resp.status === 200) {
            const currentRow = {
                ...methodRow,
                action_id: null,
                page_name: "",
                actions: [],
                method: "",
                noOfFields: null,
                fields: []
            };
            currentRow.page_name = e.target.value
            currentRow.actions = resp.data || []
            const m = { ...payload }
            m.methodsList[index] = currentRow;
            setPayload(m)

        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }

    }
    const getAbstractTestCases = async () => {
        setIsLoader(true)
        const resp = await APIKIT.get(URLS.getAbstractTestCases);
        setIsLoader(false)
        if (resp.status === 200) {
            setAbstractTestCases(resp.data)
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }


    return (
        <>
            <Paper elevation={3} >
                <Box

                    component="div"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '35ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            sx={{ m: 2, minWidth: 300 }}
                            fullWidth
                            required
                            id="outlined-required"
                            label="Test Case Name"
                            value={payloadTitle.testCaseName}
                            onChange={(e) => {
                                setPayloadTitle({ ...payloadTitle, testCaseName: e.target.value })
                            }}
                        />
                        <TextField
                            sx={{ m: 2, minWidth: 300 }}
                            fullWidth
                            disabled
                            required
                            id="outlined-required"
                            label="AUT"
                            value={payloadTitle.aut}
                            onChange={(e) => {
                                setPayloadTitle({ ...payloadTitle, aut: e.target.value })
                            }}
                        />
                    </div>
                </Box>
            </Paper>
            <Paper style={{
                marginTop: "10px"
            }} elevation={3} >
                {/* <Divider /> */}
                <Box
                    // style={{
                    //     border: "1px solid #1976d2"
                    // }}
                    component="div"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '35ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 300 }}>
                            <InputLabel id="demo-simple-select-helper-label" shrink>Type</InputLabel>
                            <Select
                                disabled={!listType.length}
                                type='text'
                                label="Type"
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={payload.type.type_id}
                                variant='outlined'
                                InputLabelProps={{
                                    shrink: true,
                                    name: 'Type',
                                    id: "Type-001",
                                }}
                                onChange={(e) => {
                                    const item = listType.find(row => row.id === e.target.value)
                                    if (item) {
                                        setPayload({
                                            ...payload,
                                            type: {
                                                type_id: item.id,
                                                type_name: item.title
                                            }
                                        })
                                    }
                                }}
                            >
                                {listType.map(l => <MenuItem key={l.id} value={l.id}>{l.title}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button
                            style={{
                                marginTop: "18px"
                            }} variant="contained" onClick={(e) => {
                                setPayload({
                                    ...payload,
                                    methodsList: [...payload.methodsList, {
                                        event: "",
                                        type: "action",
                                        action_id: null,
                                        page_name: "",
                                        actions: [],
                                        method: "",
                                        noOfFields: null,
                                        fields: []

                                    }]
                                })

                            }}  >Add Method</Button>
                        <Button
                            style={{
                                marginTop: "18px",
                                marginLeft: "18px"
                            }} variant="contained" onClick={(e) => {
                                setPayload({
                                    ...payload,
                                    methodsList: [...payload.methodsList, {
                                        event: "",
                                        type: "abstract",
                                        action_id: null,
                                        page_name: "",
                                        actions: [],
                                        method: "",
                                        noOfFields: null,
                                        fields: []

                                    }]
                                })

                            }}  >Abstract </Button>
                        <Button
                            style={{
                                marginTop: "18px",
                                marginLeft: "18px"
                            }} variant="contained" onClick={(e) => {
                                setPayload({
                                    ...payload,
                                    methodsList: [...payload.methodsList, {
                                        event: "",
                                        type: "generic",
                                        action_id: null,
                                        page_name: "",
                                        actions: [],
                                        method: "",
                                        noOfFields: null,
                                        fields: []

                                    }]
                                })

                            }}  >Generic</Button>
                    </div>
                    <Divider />
                    {payload.methodsList.map((methodRow, index) => {
                        if (methodRow.type === "action") {
                            return <div key={index}>
                                <FormControl sx={{ m: 1, minWidth: 350 }}>
                                    <InputLabel id="demo-simple-select-helper-label">Page</InputLabel>
                                    <Select
                                        label="Page"
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={methodRow.page_name}
                                        onChange={(e) => {
                                            selectPage(e, methodRow, index)
                                        }}
                                    >
                                        {pagesList.map(l => <MenuItem key={l.page_name} value={l.page_name}>{l.page_name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                {methodRow.actions.length > 0 ?
                                    <FormControl sx={{ m: 1, minWidth: 350 }}>
                                        <InputLabel id="demo-simple-select-helper-label">Method</InputLabel>
                                        <Select
                                            label="Method"
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={methodRow.method}
                                            onChange={(e) => {
                                                console.log(e.target.value)
                                                const item = methodRow.actions.find(row => row.action_name === e.target.value);
                                                if (item) {
                                                    const currentRow = { ...methodRow };
                                                    currentRow.method = item.action_name
                                                    currentRow.noOfFields = Number(item.nooffields)
                                                    currentRow.fields = item.action_parameters.map(param => {
                                                        return {
                                                            ...param,
                                                            value: param.defaultValue || ""
                                                        }
                                                    });
                                                    const m = { ...payload }
                                                    m.methodsList[index] = currentRow;
                                                    setPayload(m)
                                                }
                                            }}
                                        >
                                            {methodRow.actions.map((l, index) => <MenuItem key={l.action_name} value={l.action_name}>{l.action_name}</MenuItem>)}
                                        </Select>
                                    </FormControl> : null
                                }
                                {methodRow.fields.map((fieldRow, findex) => {
                                    return <TextField
                                        sx={{ m: 2, minWidth: 300 }}
                                        key={fieldRow.fieldName}
                                        fullWidth
                                        required
                                        value={fieldRow.value}
                                        id="outlined-required"
                                        label={fieldRow.fieldName}
                                        onChange={(e) => {
                                            const currentRow = { ...fieldRow };
                                            currentRow.value = e.target.value;
                                            const MCurrentRow = { ...methodRow };
                                            MCurrentRow.fields[findex] = currentRow;
                                            const m = { ...payload }
                                            m.methodsList[index] = MCurrentRow;
                                            setPayload(m)


                                        }}
                                    />
                                })
                                }
                                {payload.methodsList.length == 1 ? null : <RemoveCircleIcon onClick={(e) => {
                                    const methodsList = [...payload.methodsList];
                                    methodsList.splice(index, 1);
                                    const m = { ...payload }
                                    m.methodsList = methodsList;
                                    setPayload(m)

                                }} className={classes.icon} fontSize='medium' />}
                                <Divider />
                            </div>
                        } else if (methodRow.type === "abstract") {
                            return <div key={index}>
                                <FormControl sx={{ m: 1, minWidth: 350 }}>
                                    <InputLabel id="demo-simple-select-helper-label">Abstract Test Case</InputLabel>
                                    <Select
                                        label="Abstract Test Case"
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={methodRow.method}
                                        onChange={(e) => {
                                            const item = abstractTestCases.find(row => row.testcasename === e.target.value)
                                            if (item) {
                                                if (item) {
                                                    const currentRow = { ...methodRow };
                                                    currentRow.method = item.testcasename;
                                                    let list = []
                                                    if (item.testcasefixturesteps) {
                                                        let methods = Object.keys(item.testcasefixturesteps);
                                                        methods.forEach(x => {
                                                            let nameSplit = x.split("_");
                                                            let f = Object.keys(item.testcasefixturesteps[x])
                                                            let fields = [];
                                                            f.forEach(y => {
                                                                fields.push({
                                                                    fieldName: y,
                                                                    value: item.testcasefixturesteps[x][y]
                                                                })

                                                            })
                                                            list.push({
                                                                original: x,
                                                                page_name: nameSplit[0],
                                                                method: nameSplit[1],
                                                                fields
                                                            })

                                                        })


                                                    }
                                                    currentRow.fields = list
                                                    const m = { ...payload }
                                                    m.methodsList[index] = currentRow;
                                                    setPayload(m)
                                                }
                                            }
                                            // console.log(e.target.value)
                                            // selectPage(e, methodRow, index)
                                        }}
                                    >
                                        {abstractTestCases.map(l => <MenuItem key={l.testcasename} value={l.testcasename}>{l.testcasename}</MenuItem>)}
                                    </Select>
                                </FormControl>

                                {methodRow.fields.map((fieldRow, findex) => {
                                    return <div>
                                        <TextField
                                            sx={{ m: 2, minWidth: 300 }}
                                            key={fieldRow.fieldName}
                                            disabled
                                            fullWidth
                                            required
                                            value={fieldRow.page_name}
                                            id="outlined-required"
                                            label={'Page'}
                                        />
                                        <TextField
                                            sx={{ m: 2, minWidth: 300 }}
                                            key={fieldRow.fieldName}
                                            disabled
                                            fullWidth
                                            required
                                            value={fieldRow.method}
                                            id="outlined-required"
                                            label={'Method'}
                                        />
                                        {fieldRow.fields.map((subField, Sindex) => <TextField
                                            sx={{ m: 2, minWidth: 300 }}
                                            key={fieldRow.fieldName}
                                            fullWidth
                                            required
                                            value={subField.value}
                                            id="outlined-required"
                                            label={subField.fieldName}
                                            onChange={(e) => {
                                                const currentRow = { ...methodRow };
                                                currentRow.fields[findex].fields[Sindex].value = e.target.value;
                                                const m = { ...payload }
                                                m.methodsList[index] = currentRow;
                                                setPayload(m)

                                            }}
                                        />)}
                                    </div>
                                })}
                                {payload.methodsList.length == 1 ? null : <RemoveCircleIcon onClick={(e) => {
                                    const methodsList = [...payload.methodsList];
                                    methodsList.splice(index, 1);
                                    const m = { ...payload }
                                    m.methodsList = methodsList;
                                    setPayload(m)

                                }} className={classes.icon} fontSize='medium' />}
                                <Divider />
                            </div>
                        } else if (methodRow.type === "generic") {
                            return <div key={index}>
                                <FormControl sx={{ m: 1, minWidth: 350 }}>
                                    <InputLabel id="demo-simple-select-helper-label">Page</InputLabel>
                                    <Select
                                        label="Page"
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={methodRow.page_name}
                                        onChange={(e) => {
                                            selectPage(e, methodRow, index)
                                        }}
                                    >
                                        {pagesList.map(l => <MenuItem key={l.page_name} value={l.page_name}>{l.page_name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <TextField
                                    sx={{ m: 2, minWidth: 300 }}
                                    fullWidth
                                    required
                                    value={methodRow.method}
                                    id="outlined-required"
                                    label={'Method'}
                                    onChange={(e) => {
                                        const currentRow = { ...methodRow };
                                        currentRow.method = e.target.value;
                                        const m = { ...payload }
                                        m.methodsList[index] = currentRow;
                                        setPayload(m)


                                    }}
                                />
                                <TextField
                                    sx={{ m: 2, minWidth: 300 }}
                                    fullWidth
                                    required
                                    value={methodRow.event}
                                    id="outlined-required"
                                    label={'Event (action) '}
                                    onChange={(e) => {
                                        const currentRow = { ...methodRow };
                                        currentRow.event = e.target.value;
                                        const m = { ...payload }
                                        m.methodsList[index] = currentRow;
                                        setPayload(m)


                                    }}
                                />
                                {payload.methodsList.length == 1 ? null : <RemoveCircleIcon onClick={(e) => {
                                    const methodsList = [...payload.methodsList];
                                    methodsList.splice(index, 1);
                                    const m = { ...payload }
                                    m.methodsList = methodsList;
                                    setPayload(m)

                                }} className={classes.icon} fontSize='medium' />}
                                <Divider />
                            </div>
                        }
                    })}
                    <Typography style={{
                        textAlign: "end",
                        marginBottom: "10px"
                    }} p={2} variant="h6" component="div" gutterBottom>

                        <Button
                            disabled={true}
                            style={{
                                marginTop: "15px",
                                marginRight: "10px"
                            }} variant="contained"  >{currentStep + 1} of {totalSteps}</Button>

                        <Button
                            disabled={!currentStep}
                            style={{
                                marginTop: "15px",

                            }} variant="contained" onClick={(e) => {
                                let count = currentStep - 1;
                                const currentStepsPayload = stepsPayload;
                                currentStepsPayload[currentStep] = payload;
                                setStepsPayload(currentStepsPayload)
                                setCurrentStep(count)
                                setPayload({ ...currentStepsPayload[count] })
                            }}  >Back</Button>
                        <Button
                            style={{
                                marginRight: "10px",
                                marginLeft: "10px",
                                marginTop: "15px"
                            }} variant="contained" onClick={(e) => {
                                let count = currentStep + 1;
                                // setStepsPayload(stepsPayload => [...stepsPayload, payload]);
                                const currentStepsPayload = stepsPayload;
                                if (count + 1 <= currentStepsPayload.length) {
                                    setPayload({ ...currentStepsPayload[count] })
                                    currentStepsPayload[currentStep] = payload;
                                    setStepsPayload(currentStepsPayload)
                                } else {
                                    setTotalSteps(totalSteps => totalSteps + 1)
                                    setStepsPayload(stepsPayload => [...stepsPayload, payload]);
                                    setPayload({
                                        type: {
                                            type_id: null,
                                            type_name: ""
                                        },
                                        methodsList: [{
                                            event: "",
                                            action_id: null,
                                            page_name: "",
                                            actions: [],
                                            method: "",
                                            noOfFields: null,
                                            fields: []

                                        }],

                                    })
                                }
                                setCurrentStep(count)

                            }}  >Next</Button>

                        <Button
                            style={{
                                marginTop: "15px"
                            }} variant="contained" onClick={(e) => {
                                let list = [];
                                if (totalSteps === stepsPayload.length) {
                                    list = [...stepsPayload]
                                } else {
                                    list = [...stepsPayload, payload]
                                }
                                list[currentStep] = payload;
                                let error = false;
                                for (let i = 0; i < list.length; i++) {
                                    if (!list[i].type.type_id) {
                                        addToast(`${i + 1} step in type is required`, { appearance: 'error' });
                                        error = true
                                        break;
                                    }
                                    for (let j = 0; j < list[i].methodsList.length; j++) {
                                        if (list[i].methodsList[j].type === "action") {
                                            if (!list[i].methodsList[j].page_name) {
                                                addToast(`${i + 1} step in ${j + 1} row in page name is required`, { appearance: 'error' });
                                                error = true
                                                break;

                                            }
                                            if (!list[i].methodsList[j].method) {
                                                addToast(`${i + 1} step in ${j + 1} row in method is required`, { appearance: 'error' });
                                                error = true
                                                break;

                                            }
                                        }
                                    }
                                }
                                if (error) {
                                    return null
                                }
                                const obj = {
                                    ...payloadTitle,
                                    totalPayload: list,
                                    parameter: testCaseBuildPayload(list)
                                }
                                AddTestCase(obj)
                            }} >   {test_Id === null ? "Save" : "Update"}</Button>


                    </Typography>
                </Box>

            </Paper>

        </>
    );
}
