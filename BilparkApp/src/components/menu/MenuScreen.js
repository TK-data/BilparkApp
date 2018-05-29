import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Body } from 'native-base';
import ProfileButton from './ProfileButton';
import MenuBox from './MenuBox';
import Slide1 from './Slide1';
import Slide2 from './Slide2';

const images = [
  {
    image: require('../../images/menuIcons/gas_station.png'),
    routeName: 'FuelRefill',
    pageName: 'Drivstoff',
  },
  {
    image: require('../../images/menuIcons/clipboard.png'),
    routeName: 'TravelLog',
    pageName: 'Kjørebok',
  },
  {
    image: require('../../images/menuIcons/car_repair.png'),
    routeName: 'DamageReport',
    pageName: 'Skade',
  },
  {
    image: require('../../images/menuIcons/trophy.png'),
    routeName: 'Profile',
    pageName: 'Placeholder',
  },
  {
    image: require('../../images/menuIcons/team_people.png'),
    routeName: 'RegisterCompany',
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
  image: {
    width: window.width / 1.7,
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
            <Slide2 />
            <View style={styles.slide3}>
              <Image resizeMode="contain" style={styles.image} source={require('../../images/graph.png')} />
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
