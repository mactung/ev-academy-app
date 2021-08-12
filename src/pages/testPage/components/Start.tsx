import React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface IProps {
    user: any;
    doTest: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        },
        form: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        button: {
            marginTop: theme.spacing(3),
        },
    }),
);

const Start = ({ user, doTest }: IProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {user.isLogin && <Typography variant="h6">Welcome, {user.name}</Typography>}
            <div>
                <Typography>Khi bắt đầu làm bài thời gian sẽ luôn được tính kể cả khi bạn thoát ra.</Typography>
            </div>
            <Button className={classes.button} variant="contained" color="secondary" onClick={() => doTest()}>
                Start
            </Button>
        </div>
    );
};

export default Start;
