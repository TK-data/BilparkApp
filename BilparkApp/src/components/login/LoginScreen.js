import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import LoginForm from './LoginForm';

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

const LoginScreen = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Første skjerm
    </Text>
    <Text style={styles.instructions}>
      Her kommer LoginForm!
    </Text>
    <LoginForm />
  </View>
);

LoginScreen.propTypes = {
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  hasErrored: state.auth.hasErrored,
  isLoading: state.auth.isLoading,
});

LoginScreen.navigationOptions = {
  title: 'Logg inn',
};

export default connect(mapStateToProps)(LoginScreen);
