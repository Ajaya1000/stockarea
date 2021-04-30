import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Detail from './component/Detail';
import List from './component/List';

const Routes = () => (
    <Router>
        <Switch>
            <Route path='/home'>
                <List />
            </Route>
            <Route path='/detail/:id'>
                <Detail />
            </Route>
            <Route path='/'>
                <List />
            </Route>
        </Switch>
    </Router>
);
export default Routes;
