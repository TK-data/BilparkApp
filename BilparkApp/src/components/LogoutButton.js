import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'native-base';

import { logout } from '../actions/auth';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  logOutButton: {
    width: window.width / 3.5,
    display: 'flex',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

const LogoutButton = ({ logoutUser }) => (
  <View>
    <Button
      bordered
      light
      onPress={logoutUser}
      style={styles.logOutButton}
    >
      <Text style={styles.buttonText}>Logg ut</Text>
    </Button>
  </View>
);


const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
