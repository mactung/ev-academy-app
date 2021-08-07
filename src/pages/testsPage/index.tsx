import React, { useEffect, useState } from 'react';
import { Container, Grid, CircularProgress, useForkRef } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TestItem from './components/TestItem';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import TestPage from '../testPage';
import { apiAxios } from '../../services/axios';
import MainLayout from '../../layouts/Main';
import AppBar from '../../components/AppBar';
import { useAppSelector } from '../../stores/hooks';

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
    const { user } = useAppSelector((state) => state.storage);

    const [tests, setTests] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        apiAxios.get('api/test').then((res) => {
            if (res.data.status == 'successful') {
                setIsLoading(false);
                setTests(res.data.result);
            }
        });
    }, []);
    return (
        <MainLayout>
            <AppBar user={user} />
            <Switch>
                <Route path={`${match.path}/:testId`}>
                    <TestPage />
                </Route>
                <Route path={match.path}>
                    <Container className={classes.root}>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Grid container spacing={3}>
                                {tests.map((test, index) => (
                                    <TestItem test={test} key={index} isLock={user.isLogin || !test.required_login} />
                                ))}
                            </Grid>
                        )}
                    </Container>
                </Route>
            </Switch>
        </MainLayout>
    );
};

export default TestsPage;
