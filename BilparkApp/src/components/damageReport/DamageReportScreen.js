import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Text } from 'native-base';

import DamageReportForm from './DamageReportForm';

const image = require('../../images/menuIcons/car_repair.png');

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002776',
    // paddingTop: '5%',
    // paddingBottom: '5%',
  },
  topContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  form: {
    display: 'flex',
    flex: 2,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    width: window.width,
  },
  title: {
    color: 'rgb(000, 039, 118)',
    fontSize: 20,
    marginBottom: 5,
    marginTop: -15,
  },
  image: {
    width: window.width * 0.15,
    height: window.height * 0.15,
    zIndex: 5,
    margin: 0,
    marginTop: -10,
  },
});

const DamageReportScreen = () => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Image resizeMode="contain" style={styles.image} source={image} />
      <Text style={styles.title}>Skaderegistrering</Text>
    </View>
    <View style={styles.form}>
      <DamageReportForm />
    </View>
  </View>
);

DamageReportScreen.navigationOptions = {
  title: 'Registrer skader på din bil',
};

export default DamageReportScreen;
