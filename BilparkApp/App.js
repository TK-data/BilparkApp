import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Font } from 'expo';
import { StyleProvider, Container } from 'native-base';
import getTheme from './native-base-theme/components';
import variables from './native-base-theme/variables/platform';


import AppReducer from './src/reducers/index';
import AppWithNavigationState from './src/navigators/AppNavigator';
import { middleware, thunk } from './src/utils/redux';

const store = createStore(
  AppReducer,
  applyMiddleware(middleware),
  applyMiddleware(thunk),
);

class ReduxExampleApp extends React.Component {

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(variables)}>
          <Container>
            <AppWithNavigationState />
          </Container>
        </StyleProvider>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('ReduxExample', () => ReduxExampleApp);

export default ReduxExampleApp;
