import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Form from './FuelDayForm';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(000, 039, 118)',
  },
  title: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  form: {
    display: 'flex',
    flex: 2,
    alignItems: 'center',
  },
});

const FuelDayScreen = () => (
  <View style={styles.container}>
    <View style={styles.title}>
      <Text style={styles.welcome}>
        Påminnelse om å fylle bensin
      </Text>
    </View>
    <View style={styles.form}>
      <Form />
    </View>
  </View>
);

FuelDayScreen.navigationOptions = {
  title: 'Påminnelse om drivstoff',
};

export default FuelDayScreen;
