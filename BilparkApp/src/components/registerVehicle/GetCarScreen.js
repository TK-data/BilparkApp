import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Form from './Form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const GetCarScreen = () => (
  <View style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Finn din bil!
      </Text>
      <Form />
    </View>
  </View>
);

GetCarScreen.navigationOptions = {
  title: 'Registrer bil',
};

export default GetCarScreen;
