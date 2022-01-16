import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

// shared
import { Headful } from '@shared/Headful/Headful';

// pages
import { SignUpPage } from '@pages/sign/SignUpPage';
import { SignInPage } from '@pages/sign/SignInPage';

// components
import useConfig from '@components/useConfig';

// hooks
import { StoreProvider, useStore } from '@hooks/useStore';

const RootNode = observer(() => {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const config = useConfig();
  const { userState } = useStore();
  
  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoadingUser(!!(token && token !== userState.token));
    if (isLoadingUser) {
      userState.getUser(config.app.API_URL, token).then(() => {
        setIsLoadingUser(false);
      });
    }
  }, [])
  
  if (isLoadingUser) {
    // TODO loading component
    return <div>Loading...</div>;
  }

  return (<Headful>
    <Switch>
        <Route exact path="/" render={props => (<div>Home</div>)} />
        <Route path="/templates" render={() => (<div>Templates</div>)} />
        <Route path="/sign-in" render={() => (<SignInPage />)} />
        <Route path="/sign-up" render={() => (<SignUpPage />)} />
        <Route render={() => (<div>Home</div>)} />
      </Switch>
  </Headful>);
});

export const App = () => (<StoreProvider>
  <RootNode />
</StoreProvider>);