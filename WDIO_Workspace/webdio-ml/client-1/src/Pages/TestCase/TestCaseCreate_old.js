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

import { APIKIT } from '../../helper/apis';
import { URLS, lookupIds } from '../../utlities/Url';
import { useEffect, useContext, useState } from 'react';
import LoaderContext from '../../Context/LoaderContext';
import { useToasts } from 'react-toast-notifications';
const useStyles = makeStyles({
    icon: {
        marginTop: "20px",
        marginLeft: "10px",
        cursor: "pointer"
    }
})


export default function TestCaseCreate() {
    const { addToast } = useToasts();
    const { setIsLoader } = useContext(LoaderContext);
    const [listType, setListTypes] = useState([]);
    const [actionsList, setActionsList] = useState([]);
    const [selectedItems, SetSelectedItems] = useState({
        type: {
            typeID: 0,
            title: ""
        },
        action: {
            actionID: 0,
            page: "",
            action: "",
            actionParameters: {},
            subAction: "",
            subActionParameters: {}

        }

    })
    const [parameters, setParameters] = useState([{
        method: "",
        parameters: [{
            key: "",
            value: ""
        }]
    }]);
    const classes = useStyles();

    useEffect(() => {
        getTypes();
        getActionList();
    }, [])

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
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                            value={selectedItems.type.typeID}
                            onChange={(e) => {
                                const item = listType.find(row => row.id === e.target.value)
                                if (item) {
                                    SetSelectedItems({
                                        ...selectedItems,
                                        type: {
                                            typeID: item.id,
                                            title: item.title
                                        }
                                    })
                                }
                            }}
                            label="Type"
                        >
                            {listType.map(l => <MenuItem key={l.id} value={l.id}>{l.title}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-helper-label">Action</InputLabel>
                        <Select
                            disabled={!actionsList.length}
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedItems.action.actionID}
                            label="Action"
                            onChange={(e) => {
                                const item = actionsList.find(row => row.action_id === e.target.value)
                                if (item) {
                                    const { action_id, page, action_name, sub_action_name, action_parameters, sub_action_parameters } = item;
                                    SetSelectedItems({
                                        ...selectedItems,
                                        action: {
                                            actionID: action_id,
                                            page: page,
                                            action: action_name,
                                            actionParameters: action_parameters,
                                            subAction: sub_action_name,
                                            subActionParameters: sub_action_parameters

                                        }
                                    })
                                }
                            }}
                        >
                            {actionsList.map(l => <MenuItem key={l.action_id} value={l.action_id}>{l.page} - {l.action_name} - {l.sub_action_name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120 }}>
                        {/* <InputLabel id="demo-simple-select-helper-label">Action</InputLabel> */}
                        <TextField
                            id="outlined-required"
                            label="AUT"

                        />
                    </FormControl>
                    <FormControl sx={{ minWidth: 300 }}>
                        {/* <InputLabel id="demo-simple-select-helper-label">Action</InputLabel> */}
                        <TextField
                            id="outlined-required"
                            label="Test Case Name"

                        />
                    </FormControl>
                </div>

            </Box>
            {selectedItems.action.page ? <> <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '35ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Box

                    border={2}
                    borderRadius={5}
                    borderColor="primary"
                >
                    <Typography ml={2} mt={1} variant="h6" component="div" gutterBottom>
                        {selectedItems.action.page}

                    </Typography>


                </Box>
                <Typography style={{
                    textAlign: "end"
                }} ml={2} mt={1} variant="h6" component="div" gutterBottom>

                    <Button variant="contained" onClick={(e) => {
                        const m = [...parameters]
                        m.push({
                            method: "",
                            parameters: [{
                                key: "",
                                value: ""
                            }]
                        })
                        setParameters(m)
                    }}>Add Method</Button>

                </Typography>

                <div>
                    {parameters.map((p, index) => <span key={index} >
                        {p.parameters.map((pp, subIndex) => <span key={`${index}-${subIndex}`} >
                            {subIndex === 0 ? <TextField
                                id="outlined-required"
                                label="Method"
                                value={p.method}
                                onChange={(e) => {
                                    const m = [...parameters];
                                    m[index].method = e.target.value;
                                    setParameters(m)
                                }}
                            /> : null}
                            {subIndex !== 0 ? <TextField
                                style={{
                                    visibility: "hidden"
                                }}
                                id="outlined-required"
                                label="Method"
                            /> : null}
                            <TextField
                                required
                                id="outlined-required"
                                label="key"
                                value={pp.key}
                                onChange={(e) => {
                                    const l = { ...pp };
                                    l.key = e.target.value;
                                    const m = [...parameters]
                                    m[index].parameters[subIndex] = l;
                                    setParameters(m)
                                }}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Value"
                                value={pp.value}
                                onChange={(e) => {
                                    const l = { ...pp };
                                    l.value = e.target.value;
                                    const m = [...parameters]
                                    m[index].parameters[subIndex] = l;
                                    setParameters(m)
                                }}
                            />
                            <AddCircleIcon onClick={(e) => {
                                const l = [...p.parameters];
                                l.push(
                                    {
                                        key: "",
                                        value: ""
                                    }
                                )
                                const m = [...parameters]
                                m[index].parameters = l;
                                setParameters(m)
                            }} className={classes.icon} fontSize='medium' />
                            <RemoveCircleIcon onClick={(e) => {
                                if (p.parameters.length === 1) {
                                    const m = [...parameters]
                                    m.splice(index, 1)
                                    setParameters(m)
                                } else {
                                    const l = [...p.parameters];
                                    l.splice(subIndex, 1)
                                    const m = [...parameters]
                                    m[index].parameters = l;
                                    setParameters(m)
                                }
                            }} className={classes.icon} fontSize='medium' />

                        </span>)}
                    </span>)}
                </div>
            </Box>
                <Box

                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography style={{
                        textAlign: "end"
                    }} ml={2} mt={1} variant="h6" component="div" gutterBottom>

                        <Button variant="contained" >Create</Button>

                    </Typography>

                </Box></> : null}
        </>
    );
}
