import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#f0f0f0f0',
        },
    }),
);
const MainLayout = ({ children }: any) => {
    const classes = useStyles();
    return <div className={classes.root}>{children}</div>;
};

export default MainLayout;
