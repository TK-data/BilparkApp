import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';

import Form from './FuelDayForm';

const image = require('../../images/menuIcons/gas_station.png');

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(000, 039, 118)',
  },
  topContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  titleContainer: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // borderStyle: 'solid',
    // borderWidth: 2,
    // borderColor: 'white',
    width: window.width,
    // borderRadius: 100,
  },
  title: {
    // marginTop: window.width / 0.1,
    color: 'rgb(000, 039, 118)',
    fontSize: 20,
    marginBottom: 5,
    marginTop: -15,
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
  image: {
    width: window.width * 0.15,
    height: window.height * 0.15,
    zIndex: 5,
    margin: 0,
    marginTop: -10,
  },
});

const FuelDayScreen = () => (
  <View style={styles.container}>
    <View style={styles.topContainer}>
      <View style={styles.titleContainer}>
        <Image resizeMode="contain" style={styles.image} source={image} />
        <Text style={styles.title}>Pushvarsel</Text>
      </View>
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
