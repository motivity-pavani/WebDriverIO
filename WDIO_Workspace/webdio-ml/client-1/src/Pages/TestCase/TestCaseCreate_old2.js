import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import { APIKIT } from '../../helper/apis';
import { URLS, lookupIds } from '../../utlities/Url';
import { useEffect, useContext, useState } from 'react';
import LoaderContext from '../../Context/LoaderContext';
import { useToasts } from 'react-toast-notifications';
import { arrayToObjectWithEmptyFields, testCaseBuildPayload } from '../../utlities/utility';

const useStyles = makeStyles({
    icon: {
        marginTop: "20px",
        marginLeft: "10px",
        cursor: "pointer"
    }
})


export default function TestCaseCreate( {test_Id}) {
    const { addToast } = useToasts();
    const { setIsLoader } = useContext(LoaderContext);
    const [listType, setListTypes] = useState([]);
    const [actionsList, setActionsList] = useState([]);
    const [stepsPayload, setStepsPayload] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [totalSteps, setTotalSteps] = useState(1);
    const [payloadTitle, setPayloadTitle] = useState({
        testCaseName: "",
        aut: "",
    });
    const [showMethod, setShowMethod] = useState(false);
    const [payload, setPayload] = useState({
        type: {
            type_id: null,
            type_name: "",
        },
        methodsList: [{
            id: null,
            page_name: "",
            actions: [],
            method: "",
            no_of_fields: null,
            fields: {},
        }],
    });

    const [newMethods, setNewMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState('');
    const classes = useStyles();

    useEffect(() => {
        getTypes();
        getActionList();
    }, [])

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
                id: null,
                page_name: "",
                actions: [],
                method: "",
                no_of_fields: null,
                fields: {},
            }],

        })
        setTotalSteps(1)
        setCurrentStep(0)
        setStepsPayload([])
    }
    const AddTestCase = async (values) => {
        setIsLoader(true)
        const resp = await APIKIT.post(URLS.addTestcase, values);
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
        const resp = await APIKIT.get(URLS.getActionList);
        setIsLoader(false)
        if (resp.status === 200) {
            setActionsList(resp.data)
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
                            <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                            <Select
                                disabled={!listType.length}
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={payload.type.type_id}
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

                        {/* <FormControl sx={{ m: 2, minWidth: 300 }}>
                            <InputLabel id="demo-simple-select-helper-label">Page</InputLabel>
                            <Select
                                disabled={!actionsList.length}
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={payload.page.action_id}
                                onChange={(e) => {
                                    const item = actionsList.find(row => row.action_id === e.target.value)
                                    if (item) {
                                        setPayload({
                                            ...payload,
                                            page: { ...item },
                                            methodsList: [{
                                                method: "",
                                                noOfFields: null,
                                                fields: {}

                                            }]
                                        })

                                    }
                                }}
                            >
                                {actionsList.map(l => <MenuItem key={l.action_id} value={l.action_id}>{l.page_name}</MenuItem>)}
                            </Select>
                        </FormControl> */}
                        <Button
                            style={{
                                marginTop: "18px"
                            }} variant="contained" onClick={(e) => {
                                setPayload({
                                    ...payload,
                                    methodsList: [...payload.methodsList, {
                                        action_id: null,
                                        page_name: "",
                                        actions: [],
                                        method: "",
                                        noOfFields: null,
                                        fields: {}

                                    }]
                                })

                            }}  >Add Method</Button>
                    </div>
                    <Divider />
                    {console.log("Payload",payload)}
                    {console.log("Action List",actionsList)}
                    {payload.methodsList.map((methodRow, index) => <div key={index}>
                        <FormControl sx={{ m: 1, minWidth: 350 }}>
                            {console.log("METHOD ROW", methodRow)}
                            <InputLabel id="demo-simple-select-helper-label">Page</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={methodRow.page_name}
                                onChange={(e) => {
                                    console.log("OnChange event", e.target.value);
                                    const item = actionsList.find(row => row.page_name === e.target.value);
                                    let items = [];
                                    actionsList.forEach(action => {
                                        if(action.page_name === e.target.value) {
                                            items.push(action);
                                        }
                                    })
                                    console.log("ITEM", items);
                                    if(items.length>0) {
                                        payload.methodsList = items;
                                        const m = { ...payload }
                                        setPayload(m);
                                        setShowMethod(true);
                                        setNewMethods(payload.methodsList);
                                    }
                                    if (item) {
                                        const currentRow = {
                                            ...methodRow,
                                            id: item.id,
                                            page_name: item.page_name,
                                            actions: JSON.parse(item.action_parameters),
                                            method: item.action_name,
                                            no_of_fields: item.no_of_fields,
                                            fields: {}
                                        };
                                        // currentRow.page_name = item.page_name;
                                        // currentRow.actions = item.action_parameters;
                                        // currentRow.action_id = item.id;
                                        // currentRow.noOfFields = item.no_of_fields;
                                        // currentRow.method = item.action_name;
                                        // const m = { ...payload }
                                        // m.methodsList[index] = currentRow;
                                        // setPayload(m)
                                    }
                                }}
                            >
                                {actionsList.map(l => <MenuItem key={l.id} value={l.page_name}>{l.page_name}</MenuItem>)}
                            </Select>
                        </FormControl>

                        {console.log("END OF METHOD ROW", newMethods)}
                        
                        {newMethods.length > 0 ?
                            <FormControl sx={{ m: 1, minWidth: 350 }}>
                                <InputLabel id="demo-simple-select-helper-label">Method</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={selectedMethod}
                                    onChange={(e) => {
                                        const item = newMethods.find(row => row.action_name === e.target.value);
                                        if (item) {
                                            setSelectedMethod(item.action_name);
                                            const currentRow = { };
                                            currentRow.action_name = item.action_name;
                                            currentRow.no_of_fields = Number(item.no_of_fields);
                                            //currentRow.fields = arrayToObjectWithEmptyFields(item.fields.split(','));
                                            currentRow.fields = JSON.parse(item.action_parameters);
                                            console.log("CUrrentRows", currentRow.fields);
                                            const m = { ...payload };
                                            m.methodsList[index] = currentRow;
                                            setPayload(m);
                                        }
                                    }}
                                >
                                    {newMethods.map((l, index) => <MenuItem key={l.action_name} value={l.action_name}>{l.action_name}</MenuItem>)}
                                </Select>
                            </FormControl> : null
                        }
                        {
                            newMethods.map(method => {
                                if (method.action_name === selectedMethod) {
                                    console.log("TRUE NEW METHOD", method)
                                    //method.action_parameters = JSON.parse(method.action_parameters);
                                    method.fields.map(fieldRow => {
                                        console.log("fieldRow", fieldRow);
                                        <TextField
                                            sx={{ m: 2, minWidth: 300 }}
                                            key={fieldRow}
                                            fullWidth
                                            required
                                            value={fieldRow.defaultValue}
                                            id="outlined-required"
                                            label={fieldRow.fieldName}
                                            onChange={(e) => {
                                                const currentRow = { ...methodRow };
                                                currentRow.fields[fieldRow] = e.target.value;
                                                const m = { ...payload }
                                                m.methodsList[index] = currentRow;
                                                setPayload(m)
                                            }}
                                        />
                                    })
                                }
                            })
                            // Object.keys(methodRow.fields).map(fieldRow =>
                            //     <TextField
                            //         sx={{ m: 2, minWidth: 300 }}
                            //         key={fieldRow}
                            //         fullWidth
                            //         required
                            //         value={methodRow.fields[fieldRow]}
                            //         id="outlined-required"
                            //         label={fieldRow}
                            //         onChange={(e) => {
                            //             const currentRow = { ...methodRow };
                            //             currentRow.fields[fieldRow] = e.target.value;
                            //             const m = { ...payload }
                            //             m.methodsList[index] = currentRow;
                            //             setPayload(m)
                            //         }}
                            //     />
                            // )
                        }
                        <Divider />
                    </div>)}
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

                                // setStepsPayload(stepsPayload => [...stepsPayload, payload]);
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
                                            action_id: null,
                                            page_name: "",
                                            actions: [],
                                            method: "",
                                            noOfFields: null,
                                            fields: {}

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
                                // console.log(payload)
                                // console.log(totalSteps)
                                // console.log(stepsPayload)
                                // console.log(testCaseBuildPayload(list))
                                // console.log(list)
                                const obj = {
                                    ...payloadTitle,
                                    totalPayload: list,
                                    parameter: testCaseBuildPayload(list)
                                }
                                AddTestCase(obj)
                                // console.log(obj)

                            }}  >Save</Button>
                    </Typography>
                </Box>

            </Paper>

        </>
    );
}
