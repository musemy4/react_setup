import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './components/login/login'

import PrivateRoute from './routes/private_route';
import SetupWrap from './components/setupView/setup_wrap';

const App = () => {
    return (
      <>
        <Switch>
            <Route exact path="/" render={(props) => <Login {...props} />} />
            <PrivateRoute exact path="/setup" isAuthenticated={ sessionStorage.getItem('authorization') } component={ SetupWrap } />
        </Switch>
      </>
    )
}

export default App;