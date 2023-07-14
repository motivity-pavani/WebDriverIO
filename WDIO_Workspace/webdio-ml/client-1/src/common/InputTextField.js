
import * as React from 'react';
import TextField from '@mui/material/TextField';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TimePicker from '@mui/lab/TimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import moment from 'moment'

const useStyles = makeStyles({
    root: {
        '& .Mui-error': {
            maxWidth: "#c4c4c4"
        }
    }
})

const InputTextField = (props) => {
    const classes = useStyles();

    if (props.type === 'String') {
        return <TextField
            {...props}
            onChange={(e) => {
                props.onChange(e)
            }}

        />
    }
    else if (props.type === 'Number') {
        return <TextField
            {...props}
            onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                props.onChange(e)
            }}

        />
    }
    else if (props.type === 'Date') {
        return <MobileDatePicker
            {...props}
            inputFormat="DD/MM/YYYY"
            value={props.value}
            onChange={(value) => {
                props.onChange({
                    target: {
                        value: moment(value).format("MM/DD/YYYY")
                    }
                })

            }}
            renderInput={(params) => <TextField {...params} error={false} />}
        />


    }
    else if (props.type === 'DateAndTime') {
        return <DateTimePicker
            {...props}
            value={props.value}
            onChange={(value) => {
                props.onChange({
                    target: {
                        value: moment(value).format("DD/MM/YYYY hh:mm:ss")
                    }
                })

            }}
            renderInput={(params) => <TextField {...params} error={false} />}
        />
    }
    else if (props.type === 'Time') {
        const d = props.value ? moment(moment().format("MM/DD/YYYY") + " " + props.value) : ""
        return <TimePicker
            {...props}
            value={d}
            onChange={(value) => {
                props.onChange({
                    target: {
                        value: moment(value).format("h:mm a")
                    }
                })

            }}
            renderInput={(params) => <TextField {...params} error={false} />}
        />
    }
    else if (props.type === 'Boolean') {
        return <FormControl sx={{ m: 1, minWidth: 310 }}>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
                label={props.value}
                onChange={props.onChange}
            >
                <MenuItem value={true}>true</MenuItem>
                <MenuItem value={false}>false</MenuItem>
            </Select>
        </FormControl>
    }
    else
        return null

}
export default InputTextField;