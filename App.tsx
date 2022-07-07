/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import LaunchList from './src/components/launchList';
import store from './src/redux/store';
export type AppDispatch = typeof store.dispatch;

const App: () => React.ReactElement = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ReduxProvider store={store}>
        <LaunchList />
      </ReduxProvider>
    </>
  );
};

export default App;
