import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { logout } from '../actions/auth';

const AuthButton = ({ logoutUser, loginScreen, isLoggedIn }) => (
  <View>
    <Button
      title={isLoggedIn ? 'Logg ut' : 'Logg inn'}
      onPress={isLoggedIn ? logoutUser : loginScreen}
    />
  </View>
);

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  loginScreen: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logout()),
  loginScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Login' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
