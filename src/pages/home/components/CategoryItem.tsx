import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import TestItem from './TestItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: '64px',
        },
        buttonNext: {
            marginTop: theme.spacing(3),
        },
    }),
);
const CategoryItem = ({ category, user }: any) => {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h4">{category.name}</Typography>
            <Grid container spacing={3}>
                {category.tests.map((test: any) => (
                    <TestItem test={test} key={test.id} isLock={user.isLogin || !test.required_login} />
                ))}
            </Grid>
        </div>
    );
};

export default CategoryItem;
