import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

import DamageReportForm from './DamageReportForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002776',
  },
  text: {
    color: 'white',
  },
});

const DamageReportScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Registrer skader på ditt kjøretøy her</Text>
    <DamageReportForm />
  </View>
);

DamageReportScreen.navigationOptions = {
  title: 'Registrer skader på din bil',
};

export default DamageReportScreen;
