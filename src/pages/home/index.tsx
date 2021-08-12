import React, { Fragment, useState, useEffect } from 'react';
import { Container, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { apiAxios } from '../../services/axios';
import AppBar from '../../components/AppBar';
import CategoryItem from './components/CategoryItem';
import { useAppSelector } from '../../stores/hooks';

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

const HomePage = () => {
    const classes = useStyles();
    const { user } = useAppSelector((state) => state.storage);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<any[]>([]);
    useEffect(() => {
        apiAxios.get('api/category?filters=type=test&embeds=tests').then((res) => {
            if (res.data.status == 'successful') {
                setCategories(res.data.result);
            }
            setIsLoading(false);
        });
    }, []);

    return (
        <Fragment>
            <AppBar user={user} />
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Container className={classes.root}>
                    {categories.map((c) => (
                        <CategoryItem key={c.id} category={c} user={user} />
                    ))}
                </Container>
            )}
        </Fragment>
    );
};
export default HomePage;
