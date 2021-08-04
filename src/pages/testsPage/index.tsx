import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TestItem from './components/TestItem';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import TestPage from '../testPage';
import { apiAxios } from '../../store/axios';
import MainLayout from '../../layouts/Main';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

const TestsPage = () => {
    const classes = useStyles();
    const match = useRouteMatch();
    const [tests, setTests] = useState<any[]>([]);
    useEffect(() => {
        apiAxios.get('api/test').then((res) => {
            if (res.data.status == 'successful') {
                console.log(res.data.result);
                setTests(res.data.result);
            }
        });
    }, []);
    return (
        <MainLayout>
            <Switch>
                <Route path={`${match.path}/:testId`}>
                    <TestPage />
                </Route>
                <Route path={match.path}>
                    <Container className={classes.root}>
                        <Grid container spacing={3}>
                            {tests.map((test, index) => (
                                <TestItem test={test} key={index} />
                            ))}
                        </Grid>
                    </Container>
                </Route>
            </Switch>
        </MainLayout>
    );
};

export default TestsPage;
