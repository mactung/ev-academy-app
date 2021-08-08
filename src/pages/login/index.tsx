import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LoginView from './components/LoginView';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAppSelector } from '../../stores/hooks';

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

const LoginPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const { user } = useAppSelector((state) => state.storage);
    useEffect(() => {
        if (user.isLogin) {
            history.goBack();
        }
    }, [user]);

    return (
        <Container className={classes.root} maxWidth="lg">
            <LoginView />
        </Container>
    );
};
export default LoginPage;
