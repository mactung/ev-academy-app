import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface IProps {
    username: string;
    setUsername: (value: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
        },
        form: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    }),
);

const NameInput = ({ username, setUsername }: IProps) => {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setUsername((event.target as HTMLInputElement).value);
    };

    return (
        <div className={classes.root}>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    id="outlined-basic"
                    label="Enter your name"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChange(e)}
                    variant="outlined"
                />
            </form>
        </div>
    );
};

export default NameInput;
