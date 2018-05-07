import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'native-base';

import GetCarForm from './GetCarForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002776',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  welcomeContent: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 2,
  },
  carlogo: {
    height: 100,
    width: 100,
  },
});

const GetCarScreen = () => (
  <View style={styles.container}>
    <View style={styles.welcomeContent}>
      <Image resizeMode="contain" style={styles.carlogo} source={require('../../images/search_car.png')} />
    </View>
    <View style={styles.content}>
      <GetCarForm />
    </View>
  </View>
);

GetCarScreen.navigationOptions = {
  title: 'Registrer bil',
};

export default GetCarScreen;
