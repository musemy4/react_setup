import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './_views/login/login';
import PrivateRoute from './_routes/private_route';
import SetupSettingWrap from './_views/setupSettings/setup_setting_wrap';

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