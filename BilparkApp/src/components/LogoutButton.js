import React from 'react';
import { connect } from 'react-redux';
import { Button, View } from 'react-native';
import { logout } from '../actions/auth';

const LogoutButton = ({ logoutUser }) => (
  <View>
    <Button
      title="Logg ut"
      onPress={logoutUser}
    />
  </View>
);


const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
