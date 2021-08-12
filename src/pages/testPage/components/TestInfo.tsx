import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            right: '20px',
            bottom: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            boxShadow: '5px 10px #888888',
            borderRadius: '20px',
        },
    }),
);
const TestInfo = ({ checkAnswer }: any) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const finish = () => {
        checkAnswer();
        setOpen(false);
    };
    return (
        <>
            <div className={classes.root}>
                <Button color="primary" variant="outlined" onClick={handleClickOpen}>
                    Finish
                </Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Kết thúc bài kiểm tra?</DialogTitle>
                <DialogContent>
                    <DialogContentText>Bạn có chắc chắn muốn kết thúc bài kiểm tra này?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={finish} variant="contained" color="primary">
                        Finish
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TestInfo;
