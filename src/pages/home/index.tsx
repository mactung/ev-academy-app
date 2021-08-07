import React from 'react';
import { Container, Button, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { removeUser } from '../../stores/slices/storageSlice';
import { logout } from '../../services/service';
import Cookies from 'universal-cookie';
import { setHeaders } from '../../services/axios';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
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
    useEffect(() => {}, []);

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
        <Container className={classes.root} maxWidth="lg">
            {user.isLogin ? (
                <>
                    <Typography variant="h6">Welcome, {user.name}</Typography>
                    <Button variant="contained" color="primary" onClick={logoutHandle} className={classes.buttonNext}>
                        Logout
                    </Button>
                </>
            ) : (
                <Button href="/login" variant="contained" color="primary" className={classes.buttonNext}>
                    Login
                </Button>
            )}
            <Button href="/tests" variant="contained" color="primary" className={classes.buttonNext}>
                {user ? 'Go to Test' : 'Free Test'}
            </Button>
        </Container>
    );
};
export default HomePage;
