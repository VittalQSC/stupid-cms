import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Provider as MobxProvider, inject } from "mobx-react";

// components
import { SignUpPage } from '@pages/sign/SignUpPage';
import { SignInPage } from '@pages/sign/SignInPage';
import { Headful } from '@shared/Headful/Headful';
import { StoreProvider } from '@hooks/useStore';

export const App = () => (<StoreProvider>
  <Headful>
    <Switch>
        <Route exact path="/" render={props => (<div>Home</div>)} />
        <Route path="/templates" render={() => (<div>Templates</div>)} />
        <Route path="/sign-in" render={() => (<SignInPage />)} />
        <Route path="/sign-up" render={() => (<SignUpPage />)} />
        <Route render={() => (<div>Home</div>)} />
      </Switch>
  </Headful>
</StoreProvider>);