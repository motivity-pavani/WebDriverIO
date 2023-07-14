import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    TextField,
    Grid,
    Paper,
    AppBar,
    Typography,
    Toolbar,
    Link,
} from "@mui/material";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoaderContext from '../Context/LoaderContext';
import { useToasts } from 'react-toast-notifications';
import { APIKIT } from '../helper/apis';
import { URLS } from '../utlities/Url';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


const SignupSchema = Yup.object().shape({
    Email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    Password: Yup.string()
        .min(5, "Password must be 5 characters at minimum")
        .required("Password is required"),
});


const Login = () => {
    const { addToast } = useToasts();
    const { setIsLoader, setLogo } = useContext(LoaderContext);
    const history = useHistory();
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const [previousUrl, setpreviousUrl] = useState('');
    // const [aut, setAut] = useState([{ "autname": "DAS", "autid": 1 }, { "autname": "LEFTLANE", "autid": 2 }]);
    const [aut, setAut] = useState([]);
    const [islogin, setIslogin] = useState(false)
    const [currentResp, setCurrentResp] = useState({})



    useEffect(() => {
        let url = query.get('state');
        setpreviousUrl(url)
        // console.log("Get data==>", query.get('state'));
        // let params = new URLSearchParams(location.search);
        // console.log("paramsparams:", params)
        if (localStorage && localStorage.userData) history.push("/action");
    }, [])

    const login = async (values) => {
        setIsLoader(true)
        const resp = await APIKIT.post(URLS.signIn, values);
        setIsLoader(false)
        if (resp.status === 200) {
            resp.data.token = "Bearer " + resp.data.token;
            setCurrentResp(resp.data)
            // addToast(resp.message, { appearance: 'success' });
            // localStorage.setItem("userData", JSON.stringify(resp.data))
            // if (previousUrl) {
            //     history.push(previousUrl);
            // } else {
            //     history.push("/action");
            // }

            if (resp.data.aut) {
                if (resp.data.aut.length === 1) {
                    setAut(resp.data.aut)
                    setIslogin(true)

                } else {

                    setAut(resp.data.aut)
                    setIslogin(true)
                }
            }
            else {
                addToast("aut not assigned ", { appearance: 'error' });
            }

        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }
    const setaut = async () => {
        if (currentResp.autid && currentResp.autname) {

            setIsLoader(true)
            const resp = await APIKIT.post(URLS.setAuth, currentResp);
            setIsLoader(false)
            if (resp.status === 200) {
                let mresp = {
                    ...currentResp,
                    token: resp.data.token
                };
                localStorage.setItem("userData", JSON.stringify(mresp))
                if (previousUrl) {
                    history.push(previousUrl);
                } else {
                    history.push("/action");
                }
            }
            else {
                addToast(resp.message, { appearance: 'error' });
            }
        }
        else {
            addToast("Please choose Aut", { appearance: 'error' });
        }

    }

    return (
        <div>
            {/* <AppBar position="static" alignitems="center" color="primary">
                    <Toolbar>
                        <Grid container justify="center" wrap="wrap">
                            <Grid item>
                                <Typography variant="h6">{"Hello"}</Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar> */}
            {/* < container spacing={0} justify="center" direction="row"> */}
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center">
                {/* <Grid item > */}
                <Grid xs={12} md={4}
                    container
                    direction="column"
                    justify="center"
                    spacing={2}
                    className="login-form"
                >
                    <Paper
                        variant="elevation"
                        elevation={2}
                        className="login-background"
                    >
                        <Grid item>
                            <div
                                style={{
                                    textAlign: "center",
                                    marginBottom: "20px"
                                }}
                            >
                                <img src="images/mlb.png" />
                            </div>

                            {/* <Typography component="h1" marginBottom={2} variant="h5">
                                Sign in
                            </Typography> */}
                        </Grid>
                        <Grid item>
                            {!islogin ? <Formik
                                initialValues={{
                                    Email: '',
                                    Password: '',
                                    aut: ''
                                }}
                                inputProps={{ "data-testid": "formik" }}
                                validationSchema={SignupSchema}
                                onSubmit={async values => {
                                    login(values)
                                    // same shape as initial values
                                    // console.log(values);
                                }}
                            >
                                {({ isSubmitting, errors, touched, handleChange, setFieldTouched, values: { aut, Email, Password } }) => (
                                    <Form >
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item>
                                                <TextField
                                                    type="text"
                                                    placeholder="Email"
                                                    fullWidth
                                                    name="Email"
                                                    value={Email}
                                                    variant="outlined"
                                                    error={errors.Email && touched.Email}
                                                    id="outlined-error-helper-text"
                                                    label="Email"
                                                    helperText={errors.Email && touched.Email ? errors.Email : null}
                                                    onChange={(e) => {
                                                        setFieldTouched("Email", true, false);
                                                        handleChange(e)
                                                    }}
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    value={Password}
                                                    type="password"
                                                    placeholder="Password"
                                                    fullWidth
                                                    name="Password"
                                                    variant="outlined"
                                                    error={errors.Password && touched.Password}
                                                    id="outlined-error-helper-text"
                                                    label="Password"
                                                    helperText={errors.Password && touched.Password ? errors.Password : null}
                                                    onChange={(e) => {
                                                        setFieldTouched("Password", true, false);
                                                        handleChange(e)
                                                    }}

                                                />
                                            </Grid>
                                            {/* <Grid item>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">AUT</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={aut}
                                                        label="aut"
                                                        name="aut"
                                                        onChange={(e) => {
                                                            setFieldTouched("aut", true, false);
                                                            handleChange(e)
                                                        }}
                                                    >
                                                        <MenuItem value={10}>DAS</MenuItem>
                                                        <MenuItem value={20}>LEFTLANE</MenuItem>
                                                        <MenuItem value={20}>Admin</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid> */}
                                            <Grid item>
                                                <Button
                                                    disabled={errors.Email || errors.Password}
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    className="button-block"
                                                >
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik> : <FormControl>
                                <FormLabel id="demo-form-control-label-placement">Choose AUT</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-form-control-label-placement"
                                    name="position"
                                    defaultValue="top"
                                    onChange={e => {
                                        let selectAut = aut.find(row => row.autid === Number(e.target.value));
                                        setLogo(selectAut.image)
                                        setCurrentResp({
                                            ...currentResp,
                                            ...selectAut
                                        })

                                        // console.log("hello", e.target.value)
                                    }}
                                >

                                    {aut.map(row => <FormControlLabel key={row.autid} value={row.autid} control={<Radio />} label={row.autname} />)}
                                </RadioGroup>
                                <Button

                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className="button-block"
                                    onClick={setaut}
                                >
                                    Next
                                </Button>
                            </FormControl>}
                        </Grid>
                        {/* <Grid item>
                                    <Link href="#" variant="body2">
                                        Forgot Password?
                                    </Link>
                                </Grid> */}
                    </Paper>
                </Grid>
            </Grid>
            {/* </Grid> */}
        </div>

    );
}

export default Login;