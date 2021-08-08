import React, { useEffect, useState } from 'react';
import { Container, Grid, CircularProgress, useForkRef } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import MainLayout from '../../layouts/Main';
import AppBar from '../../components/AppBar';
import { useAppSelector } from '../../stores/hooks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

const TestsPage = () => {
    const classes = useStyles();
    const { user } = useAppSelector((state) => state.storage);

    return (
        <MainLayout>
            <Switch></Switch>
        </MainLayout>
    );
};

export default TestsPage;
