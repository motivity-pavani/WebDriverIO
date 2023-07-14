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
import { connect, useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import { APIKIT } from '../../helper/apis';
import { URLS, lookupIds } from '../../utlities/Url';
import { useEffect, useContext, useState } from 'react';
import LoaderContext from '../../Context/LoaderContext';
import { useToasts } from 'react-toast-notifications';
import { currentPage } from '../../store/action';
import { arrayToObject } from '../../utlities/utility';

const useStyles = makeStyles({
    icon: {
        marginTop: "20px",
        marginLeft: "10px",
        cursor: "pointer"
    }
})


const ActionsCreate = ({ currentPage }) => {
    const { addToast } = useToasts();
    const { setIsLoader } = useContext(LoaderContext);
    const [payload, setPayload] = useState({
        page: "",
        list: [{
            method: "",
            noOfFields: null,
            fields: ""
        }]

    })

    const classes = useStyles();

    useEffect(() => {
        currentPage('Action Create')
    }, [])


    const AddAction = async (values) => {
        setIsLoader(true)
        const resp = await APIKIT.post(URLS.addAction, values);
        setIsLoader(false)
        if (resp.status === 200) {
            addToast(resp.message, { appearance: 'success' });
            setPayload({
                page: "",
                list: [{
                    method: "",
                    noOfFields: null,
                    fields: ""
                }]

            })

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
                            fullWidth
                            required
                            value={payload.page}
                            id="outlined-required"
                            label="Page Name"
                            onChange={(e) => {
                                setPayload({
                                    ...payload,
                                    page: e.target.value
                                })

                            }}

                        />

                    </div>

                    <Divider />
                    <Typography style={{
                        textAlign: "end"
                    }} ml={2} mt={1} mr={2} variant="h6" component="div" gutterBottom>
                        <Button
                            style={{
                                marginTop: "15px"
                            }} variant="contained" onClick={(e) => {
                                const { list } = payload;
                                list.push({
                                    method: "",
                                    noOfFields: null,
                                    fields: ""
                                })
                                setPayload({
                                    ...payload,
                                    list
                                })
                            }}  >Add Method</Button>
                    </Typography>
                    {payload.list.map((row, index) =>
                        <div key={index}>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Method Name"
                                value={row.method}
                                onChange={(e) => {
                                    const { list } = payload;
                                    row.method = e.target.value;
                                    list[index] = row;
                                    setPayload({
                                        ...payload,
                                        list
                                    })
                                }}

                            />
                            <TextField
                                style={{ width: 150 }}
                                required
                                id="outlined-required"
                                label="No Of Fields"
                                value={row.noOfFields}
                                onChange={(e) => {
                                    const { list } = payload;
                                    row.noOfFields = e.target.value;
                                    list[index] = row;
                                    setPayload({
                                        ...payload,
                                        list
                                    })
                                }}

                            />
                            <TextField
                                style={{ width: 500 }}
                                helperText={<b>Example:- email,password</b>}
                                required
                                id="outlined-required"
                                label="Field Names"
                                value={row.fields}
                                onChange={(e) => {
                                    const { list } = payload;
                                    row.fields = e.target.value;
                                    list[index] = row;
                                    setPayload({
                                        ...payload,
                                        list
                                    })
                                }}

                            />
                            {index !== 0 || payload.list.length > 1 ? <RemoveCircleIcon onClick={(e) => {
                                const { list } = payload;
                                list.splice(index, 1)
                                setPayload({
                                    ...payload,
                                    list
                                })
                            }} className={classes.icon} fontSize='medium' /> : null}
                        </div>)}
                    <Typography style={{
                        textAlign: "end",
                        marginBottom: "10px"
                    }} p={2} variant="h6" component="div" gutterBottom>
                        <Button
                            style={{
                                marginTop: "15px"
                            }} variant="contained" onClick={(e) => {
                                AddAction(payload)
                            }}  >Save</Button>
                    </Typography>
                    {/* <div>
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            label="Method Name"

                        />
                        <TextField
                            style={{ width: 150 }}
                            required
                            id="outlined-required"
                            label="No Of Fields"

                        />
                        <TextField
                            style={{ width: 500 }}
                            helperText={<b>Example:- email,password</b>}
                            required
                            id="outlined-required"
                            label="Field Names"

                        />
                        <AddCircleIcon onClick={(e) => {

                        }} className={classes.icon} fontSize='medium' />
                    </div> */}


                </Box>


            </Paper>
            {/* <Paper elevation={3} >
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '35ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Page"
                            value={actionParameters.page}
                            onChange={(e) => {
                                setActionParameters({
                                    ...actionParameters,
                                    page: e.target.value
                                })
                            }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Action"
                            value={actionParameters.action}
                            onChange={(e) => {
                                setActionParameters({
                                    ...actionParameters,
                                    action: e.target.value
                                })
                            }}
                        />


                    </div>
                    {actionParameters.actionParameters.map((x, index) => <div key={index}>
                        <>
                            <TextField
                                required
                                id="outlined-required"
                                label="key"
                                value={x.key}
                                onChange={(e) => {
                                    let currentObj = x;
                                    x.key = e.target.value;
                                    const list = { ...actionParameters };
                                    list.actionParameters[index] = x;
                                    setActionParameters(list)
                                }}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="value"
                                value={x.value}
                                onChange={(e) => {
                                    let currentObj = x;
                                    x.value = e.target.value;
                                    const list = { ...actionParameters };
                                    list.actionParameters[index] = x;
                                    setActionParameters(list)
                                }}
                            />
                            {index === 0 ? <AddCircleIcon onClick={(e) => {
                                const list = { ...actionParameters };
                                list.actionParameters.push({
                                    key: "",
                                    value: ""
                                })

                                setActionParameters(list)

                            }} className={classes.icon} fontSize='medium' /> : null}
                            {index !== 0 ? <> <AddCircleIcon onClick={(e) => {
                                const list = { ...actionParameters };
                                list.actionParameters.push({
                                    key: "",
                                    value: ""
                                })

                                setActionParameters(list)

                            }} className={classes.icon} fontSize='medium' />
                                <RemoveCircleIcon onClick={(e) => {
                                    const list = { ...actionParameters };
                                    list.actionParameters.splice(index, 1)
                                    setActionParameters(list)
                                }} className={classes.icon} fontSize='medium' />
                            </> : null}
                            <TextField
                                style={{
                                    visibility: "hidden"
                                }}
                                required
                                id="outlined-required"
                                label="Page"
                            />
                        </>

                    </div>)}
                    <div>

                        <TextField
                            required
                            id="outlined-required"
                            label="Sub Action"
                            value={actionParameters.subAction}
                            onChange={(e) => {
                                setActionParameters({
                                    ...actionParameters,
                                    subAction: e.target.value
                                })
                            }}
                        />


                    </div>
                    {actionParameters.subActionParameters.map((x, index) => <div key={index}>
                        <>
                            <TextField
                                required
                                id="outlined-required"
                                label="key"
                                value={x.key}
                                onChange={(e) => {
                                    let currentObj = x;
                                    x.key = e.target.value;
                                    const list = { ...actionParameters };
                                    list.subActionParameters[index] = x;
                                    setActionParameters(list)
                                }}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="value"
                                value={x.value}
                                onChange={(e) => {
                                    let currentObj = x;
                                    x.value = e.target.value;
                                    const list = { ...actionParameters };
                                    list.subActionParameters[index] = x;
                                    setActionParameters(list)
                                }}
                            />
                            {index === 0 ? <AddCircleIcon onClick={(e) => {
                                const list = { ...actionParameters };
                                list.subActionParameters.push({
                                    key: "",
                                    value: ""
                                })
                                setActionParameters(list)
                            }} className={classes.icon} fontSize='medium' /> : null}
                            {index !== 0 ? <> <AddCircleIcon onClick={(e) => {
                                const list = { ...actionParameters };
                                list.subActionParameters.push({
                                    key: "",
                                    value: ""
                                })
                                setActionParameters(list)
                            }} className={classes.icon} fontSize='medium' />
                                <RemoveCircleIcon onClick={(e) => {
                                    const list = { ...actionParameters };
                                    list.subActionParameters.splice(index, 1)
                                    setActionParameters(list)
                                }} className={classes.icon} fontSize='medium' />
                            </> : null}
                            <TextField
                                style={{
                                    visibility: "hidden"
                                }}
                                required
                                id="outlined-required"
                                label="Page"
                            />
                        </>

                    </div>)}
                </Box >
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

                        <Button variant="contained" onClick={(e) => {
                            console.log("actionParametersactionParameters:", actionParameters)
                            const payload = {
                                ...actionParameters,
                                subActionParameters: arrayToObject(actionParameters.subActionParameters),
                                actionParameters: arrayToObject(actionParameters.actionParameters)
                            }
                            AddAction(payload)
                            // console.log("actionParametersactionParameters:", payload)

                        }} >Create</Button>

                    </Typography>

                </Box>
            </Paper> */}
        </>
    );
}

const mapStateToProps = state => {
    return {
        currentPage: state.currentPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        currentPage: (pageName) => dispatch(currentPage(pageName))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionsCreate);
