import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import { Body } from 'native-base';
import ProfileButton from './ProfileButton';
import MenuBox from './MenuBox';
import Slide1 from './Slide1';

const images = [
  {
    image: require('../../images/menuIcons/gas_station.png'),
    routeName: 'FuelRefill',
    pageName: 'Drivstoff',
  },
  {
    image: require('../../images/menuIcons/clipboard.png'),
    routeName: 'DamageRegister',
    pageName: 'Skaderegistrering',
  },
  {
    image: require('../../images/menuIcons/car_repair.png'),
    routeName: 'RegisterCar',
    pageName: 'Din bil',
  },
  {
    image: require('../../images/menuIcons/trophy.png'),
    routeName: 'Profile',
    pageName: 'Placeholder',
  },
  {
    image: require('../../images/menuIcons/team_people.png'),
    routeName: 'Profile',
    pageName: 'Placeholder',

  },
  {
    image: require('../../images/menuIcons/money_hands.png'),
    routeName: 'Profile',
    pageName: 'Placeholder',

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
    paddingTop: window.height / 100,
  },
  text: {
    fontSize: 30,
  },
  infoGraphics: {
    flex: 1,
  },
  buzzWord: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: window.height / 20,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(000, 039, 118)',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(000, 039, 118)',
  },
});


class MenuScreen extends Component {

  static navigationOptions = {
    title: 'Meny',
    headerLeft: <Body />,
    headerRight: <ProfileButton />,
  }

  render() {
    return (
      <View style={styles.menuContainer}>
        <View style={styles.infoGraphics}>
          <Swiper style={styles.wrapper} dotColor="lightgrey" activeDotColor="white">
            <Slide1 />
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
            (<MenuBox
              key={i}
              image={data.image}
              routeName={data.routeName}
              pageName={data.pageName}
            />))}
        </View>
      </View>
    );
  }
}


export default MenuScreen;
