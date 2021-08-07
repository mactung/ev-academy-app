import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    OutlinedInput,
} from '@material-ui/core';
import { login } from '../../../services/service';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { AxiosResponse } from 'axios';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        email: {
            marginBottom: theme.spacing(2),
        },
    }),
);

const LoginView = () => {
    const classes = useStyles();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const loginHandle = () => {
        login(email, password).then((res: any) => {
            if (res.status === 200) {
                window.location.reload();
            }
        });
    };

    const handleClickShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        className={classes.email}
                        label="Email"
                        value={email}
                        variant="outlined"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                            setEmail((e.target as HTMLInputElement).value)
                        }
                    />
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={isShowPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                            setPassword((e.target as HTMLInputElement).value)
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {isShowPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </form>
            </CardContent>
            <CardActions>
                <Button onClick={loginHandle}>Login</Button>
            </CardActions>
        </Card>
    );
};

export default LoginView;
