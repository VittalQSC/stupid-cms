import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Provider as MobxProvider, inject } from "mobx-react";

import styled from 'styled-components';

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

const Title: React.FC = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: red;
`;


interface DataTitleProps {
  dataStore: IDataStore,
  children: React.FC[]
}

const DataTitle: React.FC = inject('dataStore')(({ children, dataStore }: DataTitleProps) => (
  <Title>
        <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/todos">Todos</NavLink>
        </li>
        <li>
          <NavLink to="/posts">Posts</NavLink>
        </li>
      </ul>
      <Switch>
        <Route
          exact
          path="/"
          render={props => (<div>Home</div>)}
        />
        <Route path="/todos" render={() => (<div>Todos</div>)} />
        <Route path="/posts" render={() => (<div>Posts</div>)} />
        <Route render={() => (<div>Home</div>)} />
      </Switch>
      {children} 
      <ul>
        { dataStore.getData().map((item: number) => (<li key={item}>{item}</li>)) }
      </ul>
  </Title>
));

export const App = () => (<MobxProvider dataStore={new DataStore()}>
  <div>
      <DataTitle>test 2</DataTitle>
      Hello world! vitali_shatsou
  </div>
</MobxProvider>);