import React from 'react';
import { StyleSheet, View } from 'react-native';

import LoginStatusMessage from './LoginStatusMessage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = () => (
  <View style={styles.container}>
    <LoginStatusMessage />
  </View>
);

MainScreen.navigationOptions = {
  title: 'Hjem',
};

export default MainScreen;
