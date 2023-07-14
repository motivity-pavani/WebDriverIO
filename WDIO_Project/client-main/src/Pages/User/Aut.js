
import React, { useContext, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { APIKIT } from '../../helper/apis';
import { URLS } from '../../utlities/Url';
import Box from '@mui/material/Box';
import { Button, Autocomplete, Chip, Checkbox, FormControlLabel, Grid, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material';
import LoaderContext from '../../Context/LoaderContext';
import { ETTypes, EEditable, ETaction } from '../../common/Types';
import CommonTable from '../../common/CommonTable';
// import { Fab, AddPhotoAlternateIcon } from '@mui/icons-material';

const columns = [
    {
        title: "ID",
        field: "autid",
        align: 'center',
        type: ETTypes.string,
    },
    {
        title: "AUT",
        field: "autname",
        align: 'center',
        type: ETTypes.string,
    },
    {
        title: "Description",
        field: "description",
        align: 'center',
        type: ETTypes.string,
    },
    {
        title: "Action",
        field: "action",
        align: 'center',
        list: [ETaction.onEdit]
    }
]

const Aut = () => {
    const { setIsLoader, setLogo } = useContext(LoaderContext);
    const { addToast } = useToasts();
    const [autDetails, setAutDetails] = useState({
        autid: "",
        autname: "",
        description: "",
        imageUrl: "",
        base64: ""
    })
    const [upload, setUpload] = useState("")
    const [List, setList] = useState([])

    useEffect(() => {
        getList();
    }, [])


    const addAut = async () => {
        setIsLoader(true);
        let imageUrl = autDetails.imageUrl;
        if (upload) {
            const data = new FormData()
            data.append('file', upload);
            const resp = await APIKIT.post(URLS.upload, data);
            console.log("reponse file:", resp)
            if (resp.status === 200) {
                imageUrl = resp.data.filename;
                setAutDetails({
                    ...autDetails,
                    base64: "",
                    imageUrl: resp.data.filename
                })
            }
            else {
                addToast(resp.message, { appearance: 'error' });
                setIsLoader(false)
                return null
            }


        }

        const resp = await APIKIT.post(URLS.addAut, { ...autDetails, base64: "", imageUrl: imageUrl });
        setIsLoader(false)
        if (resp.status === 200) {
            if (localStorage && localStorage.userData) {
                let user = JSON.parse(localStorage.userData);
                if (user.autid === autDetails.autid) {
                    user.image = imageUrl
                    localStorage.setItem("userData", JSON.stringify(user))
                    setLogo(imageUrl)
                }
                // setLogo(user.image)
            }
            addToast(resp.message, { appearance: 'success' });
            setAutDetails({
                autid: "",
                autname: "",
                description: "",
                imageUrl: "",
                base64: ""
            })
            getList();
            // setUsers(resp.data);
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }
    const getList = async () => {
        setIsLoader(true);
        const resp = await APIKIT.get(URLS.getAutList);
        if (resp.status === 200) {
            setList(resp.data)
        }
        setIsLoader(false)
    }

    const onChangeHandler = async event => {
        var file = event.target.files[0];
        setUpload(file)
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setAutDetails({
                ...autDetails,
                imageUrl: "",
                base64: reader.result
            })
        }
        console.log(url)
        // const data = new FormData()
        // data.append('file', event.target.files[0]);
        // data.append('name', 'ABC');   //append the values with key, value pair
        // data.append('age', 20);
        // const resp = await APIKIT.post(URLS.upload, data);
        // console.log("reponse file:", resp)
        // if (resp.status === 200) {

        // }


    }

    const actions = {
        onView: (index, row) => {
        },
        onEdit: (index, row) => {
            setAutDetails({
                autid: row.autid,
                autname: row.autname,
                description: row.description,
                imageUrl: row.image,
                base64: ""
            })
            // console.log("rowrowrow:", row)
            // setUserDetails({
            //     Edit: true,
            //     Name: row.name,
            //     Email: row.email,
            //     Password: row.password,
            //     aut: row.aut ? row.aut.map(autRow => autRow.autname) : []
            // })
            // console.log("Hello", index, row)

        }
    }


    return <Paper elevation={3} square >
        <Box
            component="div"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                '& .MuiButton-root': { verticalAlign: "top", m: 2 }
            }}
        >

            <div>
                <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    value={autDetails.autname}
                    label="AUT Name"
                    onChange={(e) => {
                        setAutDetails({
                            ...autDetails,
                            autname: e.target.value
                        })
                    }}
                />
                <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Description"
                    value={autDetails.description}
                    onChange={(e) => {
                        setAutDetails({
                            ...autDetails,
                            description: e.target.value
                        })
                    }}
                />
                <Button
                    variant="contained"
                    component="label"

                >
                    Upload File
                    <input
                        onChange={onChangeHandler}
                        type="file"
                        hidden
                    />
                </Button>
                {autDetails.imageUrl && (<Box
                    component="img"
                    sx={{
                        m: 2,
                        height: 100,
                        width: 100,
                        maxHeight: { xs: 100, md: 100 },
                        maxWidth: { xs: 100, md: 100 },
                    }}
                    alt="The house from the offer."
                    src={"http://localhost:5505/images/" + autDetails.imageUrl}
                />
                )}
                {!autDetails.imageUrl && autDetails.base64 && (<Box
                    component="img"
                    sx={{
                        m: 2,
                        height: 100,
                        width: 100,
                        maxHeight: { xs: 100, md: 100 },
                        maxWidth: { xs: 100, md: 100 },
                    }}
                    alt="The house from the offer."
                    src={autDetails.base64}
                />
                )}

                {/* <input
                    accept="image/*"

                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Fab component="span" >
                        <AddPhotoAlternateIcon />
                    </Fab>
                </label> */}
                <Button onClick={addAut} variant="contained" > {autDetails.autid ? "Update" : "Add"}</Button>
            </div>
            <div>
                <CommonTable columns={columns} data={List} action={actions} />
            </div>

        </Box>
    </Paper>
}
export default Aut;