import React, { useState } from 'react';
import { Container, Button, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import NameInput from './components/NameInput';
import { useEffect } from 'react';
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
    const [username, setUsername] = useState<string>('');

    const saveUsername = () => {};

    return (
        <Container className={classes.root} maxWidth="lg">
            {!username ? (
                <NameInput username={username} setUsername={setUsername} />
            ) : (
                <Typography>Welcome, {username}</Typography>
            )}
            <Button
                href="/tests"
                variant="contained"
                color="primary"
                className={classes.buttonNext}
                onClick={saveUsername}
            >
                Next
            </Button>
        </Container>
    );
};
export default HomePage;
