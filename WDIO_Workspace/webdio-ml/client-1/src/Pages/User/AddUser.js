import React, { useContext, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { APIKIT } from '../../helper/apis';
import { URLS } from '../../utlities/Url';
import Box from '@mui/material/Box';
import { Button, Autocomplete, Chip, Paper, TextField, Typography } from '@mui/material';
import LoaderContext from '../../Context/LoaderContext';
import { DialogBox } from '../../common/ModelDialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ETTypes, EEditable, ETaction } from '../../common/Types';

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import CommonTable from '../../common/CommonTable';


const autList = [
    { id: 1, name: "name 1" },
    { id: 2, name: "name 2" },
    { id: 3, name: "name 3" },
    { id: 4, name: "name 4" },
    { id: 5, name: "name 5" },
];

const useStyles = makeStyles({
    root: {
        '& .MuiFilledInput-root': {
            backgroundColor: "white",
            marginTop: "16px"
        }
    },

})
const columns = [
    {
        title: "ID",
        field: "userid",
        align: 'center',
        type: ETTypes.string,
    },
    {
        title: "Name",
        field: "name",
        align: 'center',
        type: ETTypes.string,
    },
    {
        title: "Email",
        field: "email",
        align: 'center',
        type: ETTypes.string,
    },
    {
        title: "AUT",
        field: "aut",
        align: 'center',
        type: ETTypes.string,
        pipe: (row) => {
            return row.aut ? row.aut.map(autRow => autRow.autname).join(",") : ""
        }

    },
    {
        title: "Status",
        field: "isactive",
        align: 'center',
        pipe: (row) => {
            return row.isactive ? 'Active' : 'In Active'
        },
        type: ETTypes.string,
    },

    {
        title: "Action",
        field: "action",
        align: 'center',
        list: [ETaction.onEdit]
    }
]


const AddUser = () => {
    const { setIsLoader } = useContext(LoaderContext);
    const { addToast } = useToasts();
    const [users, setUsers] = useState([]);
    const [modelPopup, setModelPopup] = useState(false);
    // const [autValue, setAutValue] = React.useState([]);
    const [List, setList] = useState([])
    const [userDetails, setUserDetails] = useState({
        Edit: false,
        Name: "",
        Email: "",
        Password: "",
        aut: []
    })
    const classes = useStyles();
    useEffect(() => {
        getUsersList();
        getList()
    }, [])

    const getUsersList = async () => {
        setIsLoader(true)
        const resp = await APIKIT.get(URLS.getUsers);
        setIsLoader(false)
        if (resp.status === 200) {
            setUsers(resp.data);
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }

    const modelHandle = () => {
        setModelPopup(!modelPopup)
    }
    const actions = {
        onView: (index, row) => {
        },
        onEdit: (index, row) => {
            setUserDetails({
                Edit: true,
                Name: row.name,
                Email: row.email,
                Password: row.password,
                aut: row.aut ? row.aut.map(autRow => autRow.autname) : []
            })
            modelHandle()
            // console.log("Hello", index, row)

        }
    }

    const getList = async () => {
        setIsLoader(true)
        const resp = await APIKIT.get(URLS.getAutList);
        if (resp.status === 200) {
            setList(resp.data)
        }
        setIsLoader(false)
    }

    const adduser = async () => {
        setIsLoader(true)
        let payload = {
            ...userDetails,
            aut: userDetails.aut.map(x => {
                let autData = List.find(y => y.autname === x)
                return autData.autid;

            })
        }
        const resp = await APIKIT.post(URLS.signUp, payload);
        setIsLoader(false)
        if (resp.status === 200) {
            addToast(resp.message, { appearance: 'success' });
            modelHandle()
            getUsersList()
            // getList();
            // setUsers(resp.data);
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }

    return <>
        <Paper elevation={3} square >
            <Box
                component="div"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '35ch' },
                }}
            >
                <Typography style={{
                    textAlign: "end"
                }} ml={2} mt={1} mr={2} variant="h6" component="div" gutterBottom>

                    <Button
                        style={{
                            marginTop: "15px",
                            marginBottom: "15px"
                        }} variant="contained" onClick={(e) => {
                            setUserDetails({
                                Edit: false,
                                Name: "",
                                Email: "",
                                Password: "",
                                aut: []
                            })
                            modelHandle()
                        }} >Add User</Button>
                </Typography>
                <CommonTable columns={columns} data={users} action={actions} />

                {/* <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow
                                    key={row.userid}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.userid}
                                    </TableCell>
                                    <TableCell >{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.isactive ? 'Active' : 'In Active'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}
            </Box>
        </Paper>
        <DialogBox
            onClose={modelHandle}
            aria-labelledby="customized-dialog-title"
            open={modelPopup}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="customized-dialog-title"
                style={{ backgroundColor: '#394671', color: '#fff' }}
                onClose={modelHandle} >
                Add User
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
                        <div>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Name"
                                value={userDetails.Name}
                                onChange={(e) => {
                                    setUserDetails({
                                        ...userDetails,
                                        Name: e.target.value
                                    })
                                }}
                            />
                            {!userDetails.Edit && (<TextField
                                fullWidth
                                required
                                type='password'
                                id="outlined-required"
                                label="Password"
                                value={userDetails.Password}
                                onChange={(e) => {
                                    setUserDetails({
                                        ...userDetails,
                                        Password: e.target.value
                                    })
                                }}
                            />)}
                            <TextField
                                disabled={userDetails.Edit}
                                fullWidth
                                required
                                id="outlined-required"
                                label="Email"
                                value={userDetails.Email}
                                onChange={(e) => {
                                    setUserDetails({
                                        ...userDetails,
                                        Email: e.target.value
                                    })
                                }}
                            />
                        </div>
                        {/* <div > */}
                        <Autocomplete
                            className={classes.root}
                            value={userDetails.aut}
                            onChange={(event, newValue) => {
                                setUserDetails({
                                    ...userDetails,
                                    aut: newValue
                                })
                                // setAutValue(newValue);
                            }}
                            multiple
                            id="tags-filled"
                            options={List.map((option) => option.autname)}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    label="AUT"
                                    placeholder="Search"
                                />
                            )}
                        />
                        {/* </div> */}

                    </Box>
                </Typography>


            </DialogContent>
            <DialogActions style={{ backgroundColor: '#394671', color: '#fff' }}>
                {/* <Button
                    style={{
                        marginTop: "15px",
                        marginBottom: "15px"
                    }} variant="contained" onClick={(e) => {
                        modelHandle()
                    }} >Close</Button> */}
                <Button
                    style={{ backgroundColor: '#394671', color: '#fff', border: '1px solid' }} variant="contained" onClick={(e) => {
                        modelHandle()
                    }} >Close</Button>

                <Button
                    style={{ backgroundColor: '#394671', color: '#fff', border: '1px solid' }}
                    onClick={adduser}
                >
                    {userDetails.Edit ? "UPDATE" : "ADD"}
                </Button>


                {/* <Button
                            style={{ backgroundColor: '#394671', color: '#fff', border: '1px solid' }}
                        >
                            Close
                        </Button> */}

            </DialogActions>

        </DialogBox>
    </>

}
export default AddUser;