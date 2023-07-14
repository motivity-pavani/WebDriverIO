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
import { arrayToObject, inputDataTypes } from '../../utlities/utility';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DialogBox, ModelDialogTitle } from '../../common/ModelDialog';
import InputTextField from '../../common/InputTextField';
import ButtonGroup from "@mui/material/ButtonGroup";
import { getUser } from '../../utlities/userDetails';

const useStyles = makeStyles({
    icon: {
        marginTop: "20px",
        marginLeft: "10px",
        cursor: "pointer"
    },
    buttonGroup: {
        marginTop: "15px"
    }

})


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



const ActionsCreate = ({ currentPage, editActionId, setEditActionId }) => {
    const { addToast } = useToasts();
    const { setIsLoader } = useContext(LoaderContext);
    const [payload, setPayload] = useState({
        page: "",
        selectedParameters: 0,
        aut: getUser().autname,
        list: [{
            method: "",
            noOfFields: null,
            fields: [],
            sub_method: "",
            sub_method_noOfFields: null,
            sub_method_fields: []
        }]

    })

    const classes = useStyles();

    useEffect(() => {
        currentPage('Action Create')
        // selectPage()
    }, [])
    useEffect(() => {
        if (editActionId) {
            selectAction()
        }

    }, [editActionId])

    const selectAction = async () => {
        setIsLoader(true);
        const resp = await APIKIT.get(URLS.getCurrentAction + editActionId);
        setIsLoader(false);
        if (resp.status === 200) {
            let data = resp.data[0]
            let reload = {
                page: data.page_name,
                aut: getUser().autname,
                selectedParameters: 0,
                list: resp.data.map(row => {
                    return {
                        method: row.action_name,
                        noOfFields: row.nooffields,
                        fields: row.action_parameters,
                        sub_method: row.sub_action_name,
                        sub_method_noOfFields: row.subactionnooffields,
                        sub_method_fields: row.sub_action_parameters
                    }
                })
            }
            setPayload(reload)
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }


    const AddAction = async (values) => {
        setIsLoader(true)
        if (editActionId) {
            const resp = await APIKIT.post(URLS.updateAction, { list: values, action_id: editActionId });
            setIsLoader(false)
            if (resp.status === 200) {
                addToast(resp.message, { appearance: 'success' });
                setPayload({
                    page: "",
                    aut: getUser().autname,
                    selectedParameters: 0,
                    list: [{
                        method: "",
                        noOfFields: null,
                        fields: [],
                        sub_method: "",
                        sub_method_noOfFields: null,
                        sub_method_fields: []
                    }]
                })

                setEditActionId(null)
            } else {
                addToast(resp.message, { appearance: 'error' });
            }
        } else {
            const resp = await APIKIT.post(URLS.addAction, { list: values });
            setIsLoader(false)
            if (resp.status === 200) {
                addToast(resp.message, { appearance: 'success' });
                setPayload({
                    page: "",
                    aut: getUser().autname,
                    selectedParameters: 0,
                    list: [{
                        method: "",
                        noOfFields: null,
                        fields: [],
                        sub_method: "",
                        sub_method_noOfFields: null,
                        sub_method_fields: []
                    }]

                })

            }

        }
    }

    const [subModel, setSubModel] = useState(false)

    const subModelPopup = () => {
        setSubModel(!subModel)
    }
    // Model
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [open, setOpen] = React.useState(false);

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
                        <TextField
                            fullWidth
                            required
                            disabled
                            value={payload.aut}
                            id="outlined-required"
                            label="AUT"
                            onChange={(e) => {
                                setPayload({
                                    ...payload,
                                    aut: e.target.value
                                })
                            }}
                        />
                    </div>

                    <Divider />
                    <Typography style={{
                        textAlign: "end"
                    }} ml={2} mt={1} mr={2} variant="h6" component="div" gutterBottom>
                        <Button
                            disabled={editActionId}
                            style={{
                                marginTop: "15px"
                            }} variant="contained" onClick={(e) => {
                                const { list } = payload;
                                list.push({
                                    method: "",
                                    noOfFields: null,
                                    fields: [],
                                    sub_method: "",
                                    sub_method_noOfFields: null,
                                    sub_method_fields: []
                                })
                                setPayload({
                                    ...payload,
                                    list
                                })
                            }}  >Add Method</Button>
                    </Typography>
                    {payload.list.map((row, index) => <>
                        <div key={index}>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Action Name"
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
                            {/* <ButtonGroup className={classes.buttonGroup} size="large " aria-label=" outlined button group">
                                <Button variant="contained">+</Button>
                                <Button >0</Button>
                                <Button variant="contained" >-</Button>
                            </ButtonGroup> */}
                            <TextField
                                style={{ width: 150 }}
                                required
                                id="outlined-required-fileld"
                                label="No Of Fields"
                                value={row.noOfFields ? row.noOfFields.toString() : ""}
                                onChange={(e) => {
                                    const onlyNums = e.target.value.replace(/[^0-9]/g, '')
                                    const { list } = payload;
                                    const filelds = [];
                                    for (var i = 0; i < onlyNums; i++) {
                                        filelds.push({
                                            fieldName: "",
                                            type: "",
                                            defaultValue: ""

                                        })
                                    }
                                    row.noOfFields = onlyNums;
                                    row.fields = filelds;
                                    list[index] = row;
                                    setPayload({
                                        ...payload,
                                        list
                                    })
                                }}

                            />

                            <Button
                                disabled={!(row.method && row.fields.length)}
                                style={{
                                    marginLeft: "15px",
                                    marginTop: "15px"
                                }} variant="contained" onClick={(e) => {
                                    setPayload({
                                        ...payload,
                                        selectedParameters: index
                                    })
                                    handleClickOpen()
                                }}  >Action parameters</Button>
                            {/* </div>
                        <div key={index}> */}
                            {/* <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Sub Action Name"
                                value={row.sub_method}
                                onChange={(e) => {
                                    const { list } = payload;
                                    row.sub_method = e.target.value;
                                    list[index] = row;
                                    setPayload({
                                        ...payload,
                                        list
                                    })
                                }}
                            /> */}
                            {/*<TextField
                                style={{ width: 150 }}
                                required
                                id="outlined-required"
                                label="No Of Fields"
                                value={row.sub_method_noOfFields}
                                onChange={(e) => {
                                    const onlyNums = e.target.value.replace(/[^0-9]/g, '')
                                    const { list } = payload;
                                    const filelds = [];
                                    for (var i = 0; i < onlyNums; i++) {
                                        filelds.push({
                                            fieldName: "",
                                            type: "",
                                            defaultValue: ""

                                        })
                                    }
                                    row.sub_method_noOfFields = onlyNums;
                                    row.sub_method_fields = filelds;
                                    list[index] = row;
                                    setPayload({
                                        ...payload,
                                        list
                                    })
                                }}
                            /> */}

                            {/* <span className={classes.icon}> */}
                            {/* <Button variant="contained"
                                style={{
                                    marginLeft: "15px",
                                    marginTop: "15px"
                                }}
                                disabled={!(row.sub_method && row.sub_method_fields.length)}
                                onClick={(e) => {
                                    setPayload({
                                        ...payload,
                                        selectedParameters: index
                                    })
                                    subModelPopup()
                                }}  >Sub Action parameters</Button> */}
                            {index !== 0 || payload.list.length > 1 ? <RemoveCircleIcon
                                className={classes.icon}
                                onClick={(e) => {
                                    const { list } = payload;
                                    list.splice(index, 1)
                                    setPayload({
                                        ...payload,
                                        list
                                    })
                                }} fontSize='medium' /> : null}
                            {/* </span> */}
                        </div>
                    </>)}
                    <Typography style={{
                        textAlign: "end",
                        marginBottom: "10px"
                    }} p={2} variant="h6" component="div" gutterBottom>
                        <Button
                            style={{
                                marginTop: "15px"
                            }} variant="contained" onClick={(e) => {
                                // console.log(payload)
                                let error = false;
                                for (let i = 0; i < payload.list.length; i++) {
                                    if (!payload.list[i].method && payload.list[i].fields.length) {
                                        addToast(`${i + 1} row in action name is required`, { appearance: 'error' });
                                        error = true;
                                        break;
                                    }
                                    if (!payload.list[i].sub_method && payload.list[i].sub_method_fields.length) {
                                        addToast(`${i + 1} row in sub action name is required`, { appearance: 'error' });
                                        error = true;
                                        break;
                                    }

                                    for (let j = 0; j < payload.list[i].fields.length; j++) {
                                        if (!payload.list[i].fields[j].fieldName) {
                                            addToast(`${j + 1} row in action parameter name is required`, { appearance: 'error' });
                                            error = true;
                                            break;
                                        }
                                        if (!payload.list[i].fields[j].type) {
                                            error = true;
                                            addToast(`${j + 1} row in action parameter type is required`, { appearance: 'error' });
                                            break;
                                        }
                                    }

                                    for (let j = 0; j < payload.list[i].sub_method_fields.length; j++) {
                                        if (!payload.list[i].sub_method_fields[j].fieldName) {
                                            addToast(`${j + 1} row in sub  action parameter name is required`, { appearance: 'error' });
                                            error = true;
                                            break;
                                        }
                                        if (!payload.list[i].sub_method_fields[j].type) {
                                            error = true;
                                            addToast(`${j + 1} row in sub action parameter type is required`, { appearance: 'error' });
                                            break;
                                        }
                                    }
                                }
                                if (error) {
                                    return null
                                }

                                if (!payload.page) {
                                    addToast(`Page name is required`, { appearance: 'error' });
                                    return null

                                }
                                if (!payload.aut) {
                                    addToast(`AUT is required`, { appearance: 'error' });
                                    return null

                                }
                                let apiPayload = payload.list.map(row => {
                                    return {
                                        page_name: payload.page,
                                        aut: payload.aut,
                                        action_name: row.method,
                                        sub_action_name: row.sub_method,
                                        action_parameters: row.fields,
                                        noOfFields: row.noOfFields,
                                        subActionNoOfFields: row.sub_method_noOfFields,
                                        sub_action_parameters: row.sub_method_fields,

                                    }

                                })
                                // console.log("apiPayloadapiPayload:", apiPayload)
                                AddAction(apiPayload)
                            }}  > {editActionId ? "Update" : "Save"}</Button>
                    </Typography>


                </Box>

                <DialogBox
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle id="customized-dialog-title"
                        style={{ backgroundColor: '#394671', color: '#fff' }}
                        onClose={handleClose} >
                        {payload.list[payload.selectedParameters].method}
                        {/* <Box
                            justifyContent={"space-around"}
                            display={'flex'}>
                            <Box
                            >
                                {payload.list[payload.selectedParameters].method}
                            </Box>

                            <Box>
                                <RemoveCircleIcon onClick={(e) => { }} />
                            </Box>
                        </Box> */}
                    </DialogTitle>
                    <DialogContent dividers  >

                        <Typography gutterBottom>
                            <Box
                                component="div"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '35ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                {payload.list[payload.selectedParameters].fields.map((rowItem, index) => <div>
                                    <TextField
                                        required
                                        value={payload.page}
                                        id="outlined-required"
                                        label="Parameter Name"
                                        value={rowItem.fieldName}
                                        onChange={(e) => {
                                            rowItem.fieldName = e.target.value;
                                            const currentPayload = { ...payload };
                                            currentPayload.list[payload.selectedParameters].fields[index] = rowItem;
                                            setPayload(currentPayload)

                                        }}

                                    />
                                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                                        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                                        <Select
                                            disabled={!inputDataTypes.length}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={rowItem.type}
                                            onChange={(e) => {
                                                rowItem.type = e.target.value;
                                                rowItem.defaultValue = null;
                                                const currentPayload = { ...payload };
                                                currentPayload.list[payload.selectedParameters].fields[index] = rowItem;
                                                setPayload(currentPayload)

                                            }}

                                        >
                                            {inputDataTypes.map(actionType => <MenuItem key={actionType} value={actionType}>{actionType}</MenuItem>)}
                                        </Select>
                                    </FormControl>


                                    <InputTextField
                                        type={rowItem.type}
                                        id="outlined-required"
                                        label="Default Value"
                                        value={rowItem.defaultValue}
                                        onChange={(e) => {
                                            rowItem.defaultValue = e.target.value;
                                            const currentPayload = { ...payload };
                                            currentPayload.list[payload.selectedParameters].fields[index] = rowItem;
                                            setPayload(currentPayload)

                                        }}

                                    />

                                    <RemoveCircleIcon onClick={(e) => {
                                        const { list } = { ...payload };
                                        const fields = [...list[payload.selectedParameters].fields];
                                        fields.splice(index, 1)
                                        list[payload.selectedParameters].fields = fields;
                                        list[payload.selectedParameters].noOfFields = fields.length;

                                        setPayload({
                                            ...payload,
                                            list: list
                                        })

                                    }} className={classes.icon} fontSize='medium' />

                                </div>)}
                            </Box>
                        </Typography>


                    </DialogContent>
                    <DialogActions style={{ backgroundColor: '#394671', color: '#fff' }}>
                        <Button
                            style={{ backgroundColor: '#394671', color: '#fff', border: '1px solid' }}
                            onClick={(e) => {
                                let temp = { ...payload };
                                temp.list[payload.selectedParameters].fields.push({
                                    fieldName: "",
                                    type: "",
                                    defaultValue: ""

                                })
                                temp.list[payload.selectedParameters].noOfFields = temp.list[payload.selectedParameters].fields.length;
                                setPayload(temp)

                            }}

                        >
                            ADD ROW
                        </Button>


                        <Button
                            style={{ backgroundColor: '#394671', color: '#fff', border: '1px solid' }}
                            onClick={handleClose}
                        >
                            ADD
                        </Button>


                        {/* <Button
                            style={{ backgroundColor: '#394671', color: '#fff', border: '1px solid' }}
                        >
                            Close
                        </Button> */}

                    </DialogActions>

                </DialogBox>

                <DialogBox
                    onClose={subModelPopup}
                    aria-labelledby="customized-dialog-title"
                    open={subModel}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle id="customized-dialog-title"
                        style={{ backgroundColor: '#394671', color: '#fff' }}
                        onClose={handleClose} >
                        {payload.list[payload.selectedParameters].sub_method}

                    </DialogTitle>
                    <DialogContent dividers  >

                        <Typography gutterBottom>
                            <Box
                                component="div"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '35ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                {payload.list[payload.selectedParameters].sub_method_fields.map((rowItem, index) => <div>
                                    <TextField
                                        required
                                        value={payload.page}
                                        id="outlined-required"
                                        label="Parameter Name"
                                        value={rowItem.fieldName}
                                        onChange={(e) => {
                                            rowItem.fieldName = e.target.value;
                                            const currentPayload = { ...payload };
                                            currentPayload.list[payload.selectedParameters].sub_method_fields[index] = rowItem;
                                            setPayload(currentPayload)

                                        }}

                                    />
                                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                                        <InputLabel id="demo-simple-select-helper-label">Page</InputLabel>
                                        <Select
                                            disabled={!inputDataTypes.length}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={rowItem.type}
                                            onChange={(e) => {
                                                rowItem.type = e.target.value;
                                                rowItem.defaultValue = null;
                                                const currentPayload = { ...payload };
                                                currentPayload.list[payload.selectedParameters].sub_method_fields[index] = rowItem;
                                                setPayload(currentPayload)

                                            }}

                                        >
                                            {inputDataTypes.map(actionType => <MenuItem key={actionType} value={actionType}>{actionType}</MenuItem>)}
                                        </Select>
                                    </FormControl>


                                    <InputTextField
                                        type={rowItem.type}
                                        id="outlined-required"
                                        label="Default Value"
                                        value={rowItem.defaultValue}
                                        onChange={(e) => {
                                            rowItem.defaultValue = e.target.value;
                                            const currentPayload = { ...payload };
                                            currentPayload.list[payload.selectedParameters].sub_method_fields[index] = rowItem;
                                            setPayload(currentPayload)

                                        }}

                                    />

                                    <RemoveCircleIcon onClick={(e) => {
                                        const { list } = { ...payload };
                                        const fields = [...list[payload.selectedParameters].sub_method_fields];
                                        fields.splice(index, 1)
                                        list[payload.selectedParameters].sub_method_fields = fields;
                                        list[payload.selectedParameters].sub_method_noOfFields = fields.length;

                                        setPayload({
                                            ...payload,
                                            list: list
                                        })

                                    }} className={classes.icon} fontSize='medium' />

                                </div>)}
                            </Box>
                        </Typography>


                    </DialogContent>
                    <DialogActions style={{ backgroundColor: '#394671', color: '#fff' }}>


                        <Button
                            style={{ backgroundColor: '#394671', color: '#fff', border: '1px solid' }}
                            onClick={subModelPopup}
                        >
                            Update
                        </Button>


                        {/* <Button
                            style={{ backgroundColor: '#394671', color: '#fff', border: '1px solid' }}
                        >
                            Close
                        </Button> */}

                    </DialogActions>

                </DialogBox>


            </Paper>

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
