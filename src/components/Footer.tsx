import React from 'react';
import { Typography, AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Link } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { logout } from '../services/service';
import { useHistory } from 'react-router-dom';
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
            history.replace('/');
        });
    };

    return (
        <div>
            
        </div>
    );
};

export default Bar;
