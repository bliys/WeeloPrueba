import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component, ...rest}: any) => {
    const routeComponent = (props: any) => (
        localStorage.getItem('token') 
            ? React.createElement(component, props)
            : <Redirect to='/login'/>
    );
    return <Route {...rest} render={routeComponent}/>;
};

export default PrivateRoute