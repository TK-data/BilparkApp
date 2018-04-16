import React from 'react';
import PropTypes from 'prop-types';
import { Body } from 'native-base';
import { StyleSheet, Button, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

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

const LoginScreen = ({ registerScreen }) => {
  return (
    <View style={styles.container}>
      <LoginForm />
      <Button title="Ny bruker" onPress={() => registerScreen()} />
    </View>
  );
};

LoginScreen.propTypes = {
  registerScreen: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  registerScreen: () => {
    dispatch(NavigationActions.navigate({ routeName: 'Register' }));
  },
});

const mapStateToProps = state => ({

});

LoginScreen.navigationOptions = {
  title: 'Logg inn',
  headerLeft: <Body />,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
