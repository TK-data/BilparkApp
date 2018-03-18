import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, View } from 'react-native';
import { postUser } from '../actions/auth';

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

// function login() {
//   this.props.postUser('test@test.test', 'testtest');
// }

const LoginScreen = ({ login }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Første skjerm
    </Text>
    <Text style={styles.instructions}>
      Woho!
    </Text>
    <Button
      onPress={login}
      title="Logg inn"
    />
  </View>
);

LoginScreen.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  hasErrored: state.auth.hasErrored,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(postUser(username, password)),
});

LoginScreen.navigationOptions = {
  title: 'Logg inn',
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
