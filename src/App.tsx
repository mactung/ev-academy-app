import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import TestsPage from './pages/testsPage';
import LoginPage from './pages/login';
import { useAppDispatch } from './stores/hooks';
import { setUser } from './stores/slices/storageSlice';
import { getUserByAccessToken } from './services/service';
import Cookies from 'universal-cookie';

const App: any = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const cookies = new Cookies();
        if (cookies.get('access_token')) {
            getUserByAccessToken().then((dataUser) => {
                if (dataUser) {
                    dispatch(setUser(dataUser));
                }
            });
        }
    }, []);
    return (
        <Router>
            <Switch>
                <Route path="/tests">
                    <TestsPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
