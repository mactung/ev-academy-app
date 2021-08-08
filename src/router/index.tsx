import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../pages/home';
import TestPage from '../pages/testPage';
import LoginPage from '../pages/login';
import { useAppSelector } from '../stores/hooks';

export default function Routers() {
    const { user } = useAppSelector((state) => state.storage);
    return (
        <Router>
            <Switch>
                <Route path="/test/:testId">
                    <TestPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <PrivateRoute authed={user.isLogin} path="/dashboard" component={TestPage} />
            </Switch>
        </Router>
    );
}
function PrivateRoute({ component, authed, ...rest }: any) {
    return (
        <Route
            {...rest}
            render={(props) =>
                authed === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    );
}
