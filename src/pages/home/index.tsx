import React, { useState } from 'react';
import { Container, Button, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { getUserByAccessToken } from '../../services/service';
import { apiAxios } from '../../services/axios';
import Cookies from 'universal-cookie';

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
    const [user, setUser] = useState<any>();

    useEffect(() => {
        getUserByAccessToken().then((data) => {
            if (data) {
                setUser(data);
            }
        });
    }, []);

    const logoutHandle = () => {
        apiAxios.post('api/auth/logout').then(() => {
            const cookies = new Cookies();
            cookies.remove('access_token');
            setUser(null);
        });
    };

    return (
        <Container className={classes.root} maxWidth="lg">
            {user ? (
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
