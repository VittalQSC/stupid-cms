import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Cookies from 'js-cookie';

// shared
import { Headful } from '@shared/Headful/Headful';

// pages
import { SignUpPage } from '@pages/sign/SignUp.Page';
import { SignInPage } from '@pages/sign/SignIn.Page';
import { HomePage } from '@pages/home/Home.Page';

// components
import useConfig from '@components/useConfig';

// hooks
import { StoreProvider, useStore } from '@hooks/useStore';

import { widgetTypes } from 'cmstmplt-vitali-shatsou';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
  }

  body {
    margin-bottom: 50px;
  }

  #root {
    height: calc(100% - 50px);
  }
`
const RootNode = observer(() => {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const config = useConfig();
  const { userStore } = useStore();

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoadingUser(!!(token && token !== userStore.token));
    if (isLoadingUser) {
      userStore.getUser(config.app.API_URL, token).then(() => {
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
        {userStore.isLoggedIn && (<Redirect from="/sign-in" to="/templates" />)}
        {userStore.isLoggedIn && (<Redirect from="/sign-up" to="/templates" />)}
        <Route exact path="/" render={props => (<HomePage />)} />
        <Route path="/templates" render={() => (<div>Templates</div>)} />
        <Route path="/sign-in" render={() => (<SignInPage />)} />
        <Route path="/sign-up" render={() => (<SignUpPage />)} />
        <Route render={() => (<div>Home</div>)} />
    </Switch>
  </Headful>);
});

export const App = () => (<StoreProvider>
  <GlobalStyle />
  <RootNode />
</StoreProvider>);