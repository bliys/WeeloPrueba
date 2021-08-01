import * as React from 'react';
import { Redirect, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Login from './components/Login';
import PrivateRoute from './routes/privateRoute';

import './custom.css'

export default () => {
    const comp = (localStorage.getItem('token')) ? 
    <Layout>
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute path='/counter' component={Counter} />
        <PrivateRoute path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout> 
    :<React.Fragment> 
        <Route exact path='/login' component={Login} />
        <Route exact path="/">
            {!localStorage.getItem('token')  ? <Redirect to="/login" /> : <Home />}
        </Route>
    </React.Fragment>

    return(comp);
};
