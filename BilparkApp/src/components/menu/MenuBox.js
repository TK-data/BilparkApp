import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';


const window = Dimensions.get('window');
const styles = StyleSheet.create({
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: window.width / 3.5,
    height: window.height / 6,
    margin: window.width / 50,
    borderRadius: 5,

  },
  image: {
    width: window.width * 0.15,
    height: window.height * 0.15,
  },
});

class MenuBox extends Component {
  render() {
    return (
      <View style={styles.box}>
        <Image resizeMode="contain" style={styles.image} source={this.props.value} />
      </View>
    );
  }
}
export default MenuBox;
