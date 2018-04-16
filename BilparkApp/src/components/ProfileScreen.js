import React from 'react';
import { StyleSheet, View } from 'react-native';
import LogoutButton from './LogoutButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const ProfileScreen = () => (
  <View style={styles.container}>
    <LogoutButton />
  </View>
);

ProfileScreen.navigationOptions = {
  title: 'Profil',
};

export default ProfileScreen;
