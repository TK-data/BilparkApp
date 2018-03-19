import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { postUser } from '../actions/auth';

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

// function login() {
//   this.props.postUser('test@test.test', 'testtest');
// }

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
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  hasErrored: state.auth.hasErrored,
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(postUser(username, password)),
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (username, password) => dispatch(postUser(username, password)),
//   };
// };

LoginScreen.navigationOptions = {
  title: 'Logg inn',
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
