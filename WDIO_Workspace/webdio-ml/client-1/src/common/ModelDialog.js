import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const ModelDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle fullWidth={true} sx={{ m: 0, p: 2, width: 1100 }} {...other}  >
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};


export const DialogBox = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paperWidthSm': {
        maxWidth: "1100px"
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),

    },
}));

