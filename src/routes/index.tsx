import React, { FC } from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up';
import Dashboard from '../pages/dashboard';
import Route from './Route';

const Routes: FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} isPravidate />
        </Switch>
    );
};

export default Routes;