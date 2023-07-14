import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { ETTypes, EEditable, ETaction } from './Types';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import moment from 'moment'
import { Button, Autocomplete, Chip, Paper, TextField, Typography } from '@mui/material';







const CommonTable = ({ columns, data = [], action }) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const dateFormate = (date = null) => {
        if (!date) return "-"
        return moment(date).format("DD-MM-YYYY & hh:mm A")

    }



    const render = (head, row, index) => {
        if (head.field === 'Action' || head.field === 'action') {
            let onView = head.list.find(x => x === ETaction.onView)
            let onDelete = head.list.find(x => x === ETaction.onDelete)
            let onEdit = head.list.find(x => x === ETaction.onEdit)
            return <>
                {onView && (<VisibilityOutlinedIcon style={{ margin: "5px", cursor: "pointer" }}
                    onClick={(e) => {
                        if (action && action.onView) {
                            action.onView(index, row)
                        }
                    }} />)}
                {onEdit && (<EditOutlinedIcon style={{ margin: "5px", cursor: "pointer" }} onClick={(e) => {
                    if (action && action.onEdit) {
                        action.onEdit(index, row)
                    }
                }} />)}
                {onDelete && (<DeleteOutlineOutlinedIcon style={{ margin: "5px", cursor: "pointer" }}
                    onClick={(e) => {
                        if (action && action.onDelete) {
                            action.onDelete(index, row)
                        }
                    }} />)}
            </>

        }
        else if (head.editable && head.editable === EEditable.onEdit) {
            return (
                <TextField
                    fullWidth
                    helperText={head.helperText || ""}
                    label={head.title}
                    name={head.title}
                    onChange={(e) => {
                        if (action && action.editRow) {
                            if (head.type === ETTypes.numeric) {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    action.editRow(index, head.field, e.target.value ? Number(e.target.value) : 0);
                                }
                            }
                            else {
                                action.editRow(index, head.field, e.target.value);
                            }
                        }

                    }}
                    required
                    value={row[head.field]}
                    variant="outlined"
                />
            )
        }
        else {
            if (head.type == ETTypes.string) {
                if (head.pipe) {
                    return head.pipe(row)
                } else {
                    return row[head.field] ? row[head.field] : '-'
                }
            }
            else if (head.type == ETTypes.numeric) {
                return row[head.field]
            }
            else if (head.type == ETTypes.currency) {
                return Number(row[head.field]).toLocaleString('en-IN')
            }
            else if (head.type == ETTypes.date) {
                return row[head.field] ? dateFormate(row[head.field]) : ""
            }

            else if (head.type == ETTypes.boolean) {
                return row[head.field] ? 'Yes' : 'No'
            }

        }
    }

    return <> <TableContainer sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    {columns.map((head, index) => <TableCell key={index} align={head.align ? head.align : "right"}>{head.title}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {/* {data.map((row, i) => <TableRow hover role="checkbox" key={i + 1}> */}
                {data?.length != 0 && data ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => <TableRow hover role="checkbox" key={i + 1}>
                    {columns.map((head) => <TableCell key={i + head.field} align={head.align ? head.align : "right"}>{render(head, row, i)}</TableCell>)}
                </TableRow>) : <TableRow hover role="checkbox" key={1}><TableCell colSpan={columns.length} align="center" key={2}>{'No Data Found'}</TableCell>  </TableRow>}



            </TableBody>
        </Table>
    </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={data ? data.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>

}

export default CommonTable;
