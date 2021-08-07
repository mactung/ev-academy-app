import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    OutlinedInput,
    Link,
} from '@material-ui/core';
import { login } from '../../../services/service';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useAppDispatch } from '../../../stores/hooks';
import { setUser } from '../../../stores/slices/storageSlice';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
            width: '40%',
            padding: '50px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        email: {
            marginBottom: theme.spacing(2),
        },
        footerAction: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            verticalAlign: 'bottom',
            marginBottom: theme.spacing(3),
            marginTop: theme.spacing(3),
        },
        socialLoginContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        wrapperButtonLogin: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonLogin: {
            padding: '6px 20px',
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    }),
);

const LoginView = () => {
    const classes = useStyles();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const history = useHistory();
    const loginHandle = () => {
        setLoadingLogin(true);
        login(email, password).then((res: any) => {
            if (res.status === 200) {
                dispatch(setUser(res.data.user));
                setLoadingLogin(false);
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
                <div className={classes.footerAction}>
                    <div className={classes.wrapperButtonLogin}>
                        <Button
                            className={classes.buttonLogin}
                            variant="contained"
                            color="primary"
                            disabled={loadingLogin}
                            onClick={loginHandle}
                        >
                            Login
                        </Button>
                        {loadingLogin && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                    <Link>Forgot password</Link>
                </div>
                {/* <div className={classes.socialLoginContainer}>
                    <Button variant="contained" color="primary" onClick={loginHandle}>
                        Facebook
                    </Button>
                    <Button variant="contained" color="secondary" onClick={loginHandle}>
                        Google
                    </Button>
                    <Button variant="contained" color="primary" onClick={loginHandle}>
                        Microsoft Teams
                    </Button>
                </div> */}
            </CardContent>
        </Card>
    );
};

export default LoginView;
