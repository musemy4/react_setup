import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './components/login/login'

import PrivateRoute from './routes/private_route';
import SetupSettingWrap from './components/setupView/setup_setting_wrap';

const App = () => {
    return (
      <>
        <Switch>
            <Route exact path="/" render={(props) => <Login {...props} />} />
            <PrivateRoute exact path="/setup" isAuthenticated={ sessionStorage.getItem('authorization') } component={ SetupSettingWrap } />
        </Switch>
      </>
    )
}

export default App;