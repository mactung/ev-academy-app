import React from 'react';
import { Typography, AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { logout } from '../services/service';
import { useHistory, Link } from 'react-router-dom';
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
        evname: {},
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
    }),
);

const Bar = ({ user }: any) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
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
            history.push('/');
        });
    };

    return (
        <AppBar position={'fixed'}>
            <Toolbar>
                <Link className={classes.linkHome} to="/">
                    <Typography variant="h6" className={classes.evname}>
                        EV Academy
                    </Typography>
                </Link>
                {user.isLogin && (
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
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem>Welcome, {user.name}</MenuItem>
                            <MenuItem onClick={logoutHandle}>Logout</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Bar;
