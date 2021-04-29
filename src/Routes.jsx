import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import List from './component/List';

const Routes = () => (
    <Router>
        <Switch>
            <Route path='/home'>
                <List />
            </Route>
            <Route path='/'>
                <List />
            </Route>
            {/* <Route path='/ware' /> */}
        </Switch>
    </Router>
);
export default Routes;
