import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { logout } from '../actions/auth';

const AuthButton = ({ logoutUser, loginScreen, isLoggedIn, menu }) => (
  <View>
    <Button
      title={isLoggedIn ? 'Logg Ut' : 'Åpne logg-inn skjerm'}
      onPress={isLoggedIn ? logoutUser : loginScreen}
    />
    <Button
      title={isLoggedIn ? 'Logg Ut' : 'Åpne meny'}
      onPress={menu}
    />
  </View>
);

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  loginScreen: PropTypes.func.isRequired,
  menu: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logout()),
  loginScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Login' })),
  menu: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Menu' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
