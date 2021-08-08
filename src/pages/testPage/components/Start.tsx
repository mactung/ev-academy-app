import React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface IProps {
    username: string;
    setUsername: (value: string) => void;
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

const Start = ({ username, setUsername, user, doTest }: IProps) => {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setUsername((event.target as HTMLInputElement).value);
    };
    return (
        <div className={classes.root}>
            {user.isLogin ? (
                <Typography>Welcome, {user.name}</Typography>
            ) : (
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        id="outlined-basic"
                        label="Enter your name"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChange(e)}
                        variant="outlined"
                    />
                </form>
            )}
            <Button className={classes.button} variant="contained" color="secondary" onClick={() => doTest()}>
                Start
            </Button>
        </div>
    );
};

export default Start;
