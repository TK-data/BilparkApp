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
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  view: {
    paddingBottom: '3%',
  },
});

const DamageReportScreen = () => (
  <View style={styles.container}>
    <View style={styles.view}>
      <Text style={styles.text}>Registrer skader på ditt kjøretøy her</Text>
    </View>
    <DamageReportForm />
  </View>
);

DamageReportScreen.navigationOptions = {
  title: 'Registrer skader på din bil',
};

export default DamageReportScreen;
