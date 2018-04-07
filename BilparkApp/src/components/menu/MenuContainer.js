import React, { Component } from 'react';
// import { Text } from 'react-native';
import { View, StyleSheet, Dimensions } from 'react-native';

import MenuBox from './MenuBox';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  menuContainer: {
    display: 'flex',
    flex: 1,
  },
  boxContainer: {
    display: 'flex',
    flex: 2,
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
});

class MenuContainer extends Component {
  render() {
    const renderSquare = i => (
      <MenuBox value={i} />
    );
    return (
      <View style={styles.menuContainer}>
        <View style={styles.infoGraphics} />
        <View style={styles.boxContainer}>
          {renderSquare(require('BilparkApp/src/images/menuIcons/fuel_station_pump.png'))}
          {renderSquare(require('BilparkApp/src/images/menuIcons/frontal_crash.png'))}
          {renderSquare(require('BilparkApp/src/images/menuIcons/clipboard_with_pencil.png'))}
          {renderSquare(require('BilparkApp/src/images/menuIcons/trophy_cup_silhouette.png'))}
          {renderSquare(require('BilparkApp/src/images/menuIcons/group.png'))}
          {renderSquare(require('BilparkApp/src/images/menuIcons/piggy_bank.png'))}

        </View>
      </View>

    );
  }
}

export default MenuContainer;
