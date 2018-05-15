import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Button, Icon, Text } from 'native-base';

import { logout } from '../actions/auth';

const LogoutButton = ({ logoutUser }) => (
  <View>
    <Button
      iconRight
      danger
      onPress={logoutUser}
    >
      <Text>Logg ut</Text>
      <Icon name="log-out" />
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
