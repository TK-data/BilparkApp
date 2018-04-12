import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Form from './FuelDayForm';

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

const FuelDayScreen = () => (
  <View style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Sett dag for notification!
      </Text>
      <Form />
    </View>
  </View>
);

FuelDayScreen.navigationOptions = {
  title: 'Påminnelse om drivstoff',
};

export default FuelDayScreen;
