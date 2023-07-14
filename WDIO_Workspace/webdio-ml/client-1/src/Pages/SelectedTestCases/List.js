import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { APIKIT } from '../../helper/apis';
import { URLS, lookupIds } from '../../utlities/Url';
import LoaderContext from '../../Context/LoaderContext';
import { useToasts } from 'react-toast-notifications';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: "0px"
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function List() {

    const { addToast } = useToasts();
    const { setIsLoader } = useContext(LoaderContext);
    const [selectedList, setSelectedList] = useState([]);

    useEffect(() => {
        getSelectedTestCases();
    }, [])

    const getSelectedTestCases = async () => {
        setIsLoader(true)
        const resp = await APIKIT.get(URLS.getSelectedTestCasesList);
        setIsLoader(false)
        if (resp.status === 200) {
            // console.log("resp.data:", resp.data)
            setSelectedList(resp.data)
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }
    const updateStatus = async (payload, index) => {
        setIsLoader(true)
        const resp = await APIKIT.post(URLS.selectedTestCasesUpdate, payload);
        setIsLoader(false)
        if (resp.status === 200) {
            payload.isactive = !payload.isactive;
            const list = [...selectedList];
            list[index] = payload;
            setSelectedList(list)
            addToast(resp.message, { appearance: 'success' });
        }
        else {
            addToast(resp.message, { appearance: 'error' });
        }
    }


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">ID</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Type</StyledTableCell>
                        <StyledTableCell align="center">Actions</StyledTableCell>

                        {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                        <StyledTableCell align="right">Calories</StyledTableCell>
                        <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                        <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedList.map((row, index) => (
                        <StyledTableRow key={row.selecttestid}>
                            <StyledTableCell align="center">{row.selecttestid}</StyledTableCell>
                            <StyledTableCell align="center">{row.actionname}</StyledTableCell>
                            <StyledTableCell align="center">{row.typename}</StyledTableCell>
                            <StyledTableCell align="center">
                                <IconButton edge="end" aria-label="delete">
                                    <Avatar style={{
                                        background: row.isactive ? "green" : "red"
                                    }}>
                                        {!row.isactive ? <ThumbDownOffAltIcon onClick={(e) => updateStatus(row, index)} /> : <ThumbUpOffAltIcon onClick={(e) => updateStatus(row, index)} />}
                                    </Avatar>
                                </IconButton>
                                {/* <IconButton edge="end" aria-label="delete">
                                    <Avatar sx={{ ml: 2 }}>
                                        <DeleteIcon />
                                    </Avatar>
                                </IconButton> */}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    {/* {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        </StyledTableRow>
                    ))} */}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
