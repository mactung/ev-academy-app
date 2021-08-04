import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import TestsPage from './pages/testsPage';
import Testpage from './pages/testPage';

const App: any = () => {
    return (
        <Router>
            <Switch>
                <Route path="/tests">
                    <TestsPage />
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
