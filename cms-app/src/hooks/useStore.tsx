import React, { createContext, useContext } from 'react'
import { useLocalStore } from 'mobx-react' // 6.x or mobx-react-lite@1.4.0

import { createStore, TStore } from '@stores/createStore'

const storeContext = createContext<TStore | null>(null)

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(createStore)
  return (<storeContext.Provider value={ store }> { children } </storeContext.Provider>);
}

export const useStore = () => {
  const store = useContext(storeContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store;
}