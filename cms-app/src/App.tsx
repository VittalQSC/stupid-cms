import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Provider as MobxProvider, inject } from "mobx-react";

// components
import { Headful } from '@shared/Headful/Headful';
import { SignUpPage } from '@pages/sign-up/SignUpPage';
import { StoreProvider } from '@hooks/useStore';

interface IDataStore {
  data: number[],
  getData: () => number[]
}
class DataStore implements IDataStore {
  data: number[] = [1, 2, 3]

  public getData() {
    return this.data;
  }
}

export const App = () => (<StoreProvider>
  <Headful>
    <Switch>
        <Route exact path="/" render={props => (<div>Home</div>)} />
        <Route path="/templates" render={() => (<div>Templates</div>)} />
        <Route path="/sign-up" render={() => (<SignUpPage />)} />
        <Route render={() => (<div>Home</div>)} />
      </Switch>
  </Headful>
</StoreProvider>);