import * as React from 'react';
import { useContext, useState } from 'react';
import { Paper, Box, TextField, Typography, Button } from '@mui/material';
import { APIKIT } from '../../helper/apis';
import { URLS } from '../../utlities/Url';
import LoaderContext from '../../Context/LoaderContext';
import { useToasts } from 'react-toast-notifications';

const Profile = () => {
    const { addToast } = useToasts();
    const { setIsLoader } = useContext(LoaderContext);
    const [payload, setPayload] = useState({
        oldPassword: "",
        newPassword: "",
        re_enterPassword: ""
    })

    const updatePassword = async () => {
        let error = false;
        Object.keys(payload).forEach(x => {
            if (!payload[x]) {
                error = true;
                addToast(`${x} is required`, { appearance: 'error' })
                return true
            }
        })

        if (error) {
            return null;
        }
        if (payload.newPassword !== payload.re_enterPassword) {
            addToast('Re-enter password not matched', { appearance: 'error' });
            return null;
        }

        const { status, message } = await APIKIT.post(URLS.updatePassowrd, payload);
        if (status === 200) {
            addToast(message, { appearance: 'success' });
        }
        else {
            addToast(message, { appearance: 'error' });
        }

    }

    return (<>
        <Paper elevation={3} >
            <Box
                component="div"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '20ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        type={"password"}
                        fullWidth
                        required
                        value={payload.oldPassword}
                        id="outlined-required"
                        label="Current Password"
                        onChange={(e) => {
                            setPayload({
                                ...payload,
                                oldPassword: e.target.value
                            })
                        }}
                    />
                    <TextField
                        type={"password"}
                        fullWidth
                        required
                        id="outlined-required"
                        label="New Password"
                        value={payload.newPassword}
                        onChange={(e) => {
                            setPayload({
                                ...payload,
                                newPassword: e.target.value
                            })
                        }}
                    />
                    <TextField
                        type={"password"}
                        fullWidth
                        required
                        id="outlined-required"
                        label="Re-Enter Password"
                        value={payload.re_enterPassword}
                        onChange={(e) => {
                            setPayload({
                                ...payload,
                                re_enterPassword: e.target.value
                            })
                        }}
                    />
                </div>
            </Box>
            <Typography style={{
                textAlign: "end",
                marginBottom: "10px"
            }} p={2} variant="h6" component="div" gutterBottom>
                <Button
                    style={{
                        marginTop: "15px"
                    }} variant="contained"
                    onClick={updatePassword}
                >Update</Button>
            </Typography>
        </Paper>
    </>)
}

export default Profile