import React, { Component } from 'react';
// import { Text } from 'react-native';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Swiper from 'react-native-swiper';

import MenuBox from './MenuBox';

const images = [
  {
    image: require('../../images/menuIcons/fuel_station_pump.png'),
    routeName: 'FuelDay',
  },
  {
    image: require('../../images/menuIcons/frontal_crash.png'),
    routeName: 'Profile',
  },
  {
    image: require('../../images/menuIcons/clipboard_with_pencil.png'),
    routeName: 'RegisterCar',
  },
  {
    image: require('../../images/menuIcons/trophy_cup_silhouette.png'),
    routeName: 'Profile',
  },
  {
    image: require('../../images/menuIcons/group.png'),
    routeName: 'RegisterCar',
  },
  {
    image: require('../../images/menuIcons/piggy_bank.png'),
    routeName: 'Logout',
  },
];

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  menuContainer: {
    display: 'flex',
    flex: 1,
  },
  boxContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'rgb(000, 039, 118)',
    paddingTop: window.height / 20,
  },
  text: {
    fontSize: 30,
  },
  infoGraphics: {
    flex: 1,
  },
  buzzWord: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

class MenuScreen extends Component {
  render() {
    return (
      <View style={styles.menuContainer}>
        <View style={styles.infoGraphics}>
          <Swiper style={styles.wrapper} activeDotColor="rgb(000, 039, 118)">
            <View style={styles.slide1}>
              <Text style={styles.buzzWord}>Test 1</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.buzzWord}>Test 2</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.buzzWord}>Test 3</Text>
            </View>
          </Swiper>
        </View>
        <View style={styles.boxContainer}>
          {images.map((data, i) =>
            <MenuBox key={i} image={data.image} routeName={data.routeName} />)}
        </View>
      </View>
    );
  }
}


export default MenuScreen;
