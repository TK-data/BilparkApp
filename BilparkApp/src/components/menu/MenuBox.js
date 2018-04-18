import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  boxContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: window.width / 40,
    marginLeft: window.width / 40,

  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // borderStyle: 'solid',
    // borderWidth: 2,
    // borderColor: 'white',
    width: window.width / 4.2,
    height: window.width / 4.2,
    marginLeft: window.width / 60,
    marginRight: window.width / 60,
    marginBottom: window.width / 50,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  image: {
    width: window.width * 0.15,
    height: window.height * 0.15,
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto',
    // marginTop: window.width / 2000,
    marginBottom: window.width / 18,
  },
});

const MenuBox = ({ navigate, image, routeName, pageName }) => {

  return (
    <TouchableOpacity onPress={() =>
      navigate(routeName)}
    >
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Image resizeMode="contain" style={styles.image} source={image} />
        </View>
        <Text style={styles.titleText}>{pageName}</Text>
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
