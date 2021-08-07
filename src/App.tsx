import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import TestsPage from './pages/testsPage';
import Testpage from './pages/testPage';
import LoginPage from './pages/login';

const App: any = () => {
    return (
        <Router>
            <Switch>
                <Route path="/tests">
                    <TestsPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/tests/:examId">
                    <Testpage />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
