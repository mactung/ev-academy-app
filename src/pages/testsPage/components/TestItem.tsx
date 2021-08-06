import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

interface IProps {
    test: any;
    isLock: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            cursor: 'pointer',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        imageExam: {
            width: '100%',
        },
    }),
);
const TestItem = ({ test, isLock }: IProps) => {
    const history = useHistory();
    const classes = useStyles();
    const goToExam = () => {
        if (isLock) history.push(`/tests/${test.id}`);
    };
    return (
        <Grid className={classes.root} item xs={12} sm={3} onClick={goToExam}>
            <Paper className={classes.paper}>
                <img className={classes.imageExam} src={test.image_url} title={test.name} />
                <Typography>{test.name}</Typography>
            </Paper>
        </Grid>
    );
};

export default TestItem;
