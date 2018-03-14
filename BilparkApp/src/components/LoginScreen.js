import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

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

// const xLoginScreen = ({ navigation }) => (
//   <View style={styles.container}>
//     <Text style={styles.welcome}>
//       This page posts data to server for login
//     </Text>
//     <TextInput
//     />
//     <Button
//       onPress={() => navigation.dispatch({ type: 'Login' })}
//       title="Log in"
//     />
//   </View>
// );

class LoginScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static navigationOptions = {
    title: 'Log in',
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

  }

  login = () => {
    const { email, password } = this.state;

    // this.props.actions.loginRequest(email, password);


    // the loginRequest (or userService?) will handle the request and
    // notify the navigation about change if login is success?
  }

  render() {
    // const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This page posts data to server for login
        </Text>
        <Text value={this.state.email} />
        <TextInput
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          secureTextEntry
        />
        <Button
          /* onPress={() => navigation.dispatch({ type: 'Login' })} */
          onPress={this.login}
          title="Log in"
        />
      </View>
    );
  }
}

// xLoginScreen.propTypes = {
//   navigation: PropTypes.object.isRequired,
// };
//
// xLoginScreen.navigationOptions = {
//   title: 'Log In',
// };

export default LoginScreen;
