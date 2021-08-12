import React from 'react';
import { Typography, AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Link } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { logout } from '../services/service';
import { useAppDispatch } from '../stores/hooks';
import { removeUser } from '../stores/slices/storageSlice';
interface ParamTypes {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            paddingTop: '64px',
            marginBottom: theme.spacing(1),
            textAlign: 'center',
        },
        evname: {
            color: '#fff',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        menuUser: {
            minWidth: '200px',
        },
        linkHome: {
            textDecoration: 'none',
            flexGrow: 1,
        },
        userWrapper: {
            backgroundColor: '#ffffff14',
            borderRadius: '40px',
            padding: '2px 12px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        loginText: {
            color: '#fff',
        },
    }),
);

const Bar = ({ user, TestInfoComponent }: any) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useAppDispatch();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandle = () => {
        logout().then(() => {
            dispatch(removeUser());
        });
    };

    return (
        <AppBar position={'fixed'}>
            <Toolbar>
                <Link className={classes.linkHome} href="/">
                    <Typography variant="h6" className={classes.evname}>
                        EV Academy
                    </Typography>
                </Link>
                {user.isLogin ? (
                    <div className={classes.userWrapper}>
                        <Typography>Welcome, {user.name}</Typography>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={logoutHandle}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Link href="/login">
                            <Typography className={classes.loginText} variant="h6">
                                Login
                            </Typography>
                        </Link>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Bar;
