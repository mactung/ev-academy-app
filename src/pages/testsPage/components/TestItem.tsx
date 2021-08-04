import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

interface IProps {
    test: any;
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
const TestItem = ({ test }: IProps) => {
    const classes = useStyles();
    const goToExam = () => {
        console.log(111);
    };
    return (
        <Grid className={classes.root} item xs={12} sm={4} onClick={goToExam}>
            <Link to={`/tests/${test.id}`}>
                <Paper className={classes.paper}>
                    <img className={classes.imageExam} src={test.image_url} title={test.name} />
                    <Typography>{test.name}</Typography>
                </Paper>
            </Link>
        </Grid>
    );
};

export default TestItem;
