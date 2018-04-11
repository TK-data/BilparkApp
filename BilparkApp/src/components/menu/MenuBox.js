import React from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

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

const MenuBox = ({ navigate, image, routeName }) => {

  return (
    <TouchableOpacity onPress={() =>
      navigate(routeName)}
    >
      <View style={styles.box}>
        <Image resizeMode="contain" style={styles.image} source={image} />
      </View>
    </TouchableOpacity>
  );
};


const mapDispatchToProps = dispatch => ({
  navigate: (routeName) => {
    dispatch(NavigationActions.navigate({ routeName }));
  },
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBox);
