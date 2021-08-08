import React, { Fragment, useState, useEffect } from 'react';
import { Container, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { removeUser } from '../../stores/slices/storageSlice';
import { logout } from '../../services/service';
import Cookies from 'universal-cookie';
import { apiAxios, setHeaders } from '../../services/axios';
import AppBar from '../../components/AppBar';
import TestItem from './components/TestItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: '64px',
        },
        buttonNext: {
            marginTop: theme.spacing(3),
        },
    }),
);

const HomePage = () => {
    const classes = useStyles();
    const { user } = useAppSelector((state) => state.storage);
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tests, setTests] = useState<any[]>([]);
    useEffect(() => {
        apiAxios.get('api/test').then((res) => {
            if (res.data.status == 'successful') {
                setIsLoading(false);
                setTests(res.data.result);
            }
        });
    }, []);

    const logoutHandle = () => {
        const cookies = new Cookies();
        setHeaders({
            Authorization: 'Bearer ' + cookies.get('access_token'),
        });
        logout().then(() => {
            dispatch(removeUser());
        });
    };

    return (
        <Fragment>
            <AppBar user={user} />

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
        </Fragment>
    );
};
export default HomePage;
