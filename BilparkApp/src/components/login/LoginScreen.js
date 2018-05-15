import React from 'react';
import { Body, Content } from 'native-base';
import { StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#002776',
  },
  content: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#002776',
  },
  button: {
    alignSelf: 'center',
  },
  contentImage: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  carlogo: {
    height: 150,
    width: 150,
  },
});

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentImage}>
          <Image resizeMode="contain" style={styles.carlogo} source={require('../../images/car.png')} />
        </View>
        <View style={styles.contentContainer}>
          <Content contentContainerStyle={styles.content}>
            <LoginForm />
          </Content>
        </View>
      </View>
    );
  }
}


const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = () => ({
});


LoginScreen.navigationOptions = {
  title: 'Logg inn',
  headerLeft: <Body />,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
