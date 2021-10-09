import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Provider as MobxProvider, inject } from "mobx-react";

// components
// import { Header } from '@shared/HeadWrapped/Header';

import { Button, OutlineButton } from '@atoms/AtomButton/AtomButton';

import styled from 'styled-components';
import { Headful } from '@shared/Headful/Headful';

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

export const App = () => (<MobxProvider dataStore={new DataStore()}>
  <Headful>
    <Switch>
        <Route exact path="/" render={props => (<div>Home</div>)} />
        <Route path="/templates" render={() => (<div>Templates</div>)} />
        <Route render={() => (<div>Home</div>)} />
      </Switch>
  </Headful>
</MobxProvider>);