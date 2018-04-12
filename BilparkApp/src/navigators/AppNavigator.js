import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { Header, Body, Left, Right, Button, Icon } from 'native-base';
import { StyleSheet, StatusBar, Image } from 'react-native';

import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import UserRegisterScreen from '../components/UserRegister/UserRegisterScreen';
import GetCarScreen from '../components/registerVehicle/GetCarScreen';
import FuelDayScreen from '../components/FuelDayScreen';
import MenuScreen from '../components/menu/MenuScreen';
import { addListener } from '../utils/redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignItems: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    height: 75,
  },
  logo: {
    height: 25,
    width: 112,
  },
});

const header = (
  <Header style={styles.header}>
    <StatusBar barStyle="light-content" hidden={false} />
    <Left style={styles.container}>
      <Button transparent >
        <Icon name="menu" />
      </Button>
    </Left>
    <Body style={styles.body}>
      <Image style={styles.logo} source={require('./../components/images/sparebank1logo.png')} />
    </Body>
    <Right style={styles.container} />
  </Header>
);

export const AppNavigator = StackNavigator({
  Register: { screen: UserRegisterScreen,
    navigationOptions: {
      header,
    },
  },
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen },
  Profile: { screen: ProfileScreen },
  RegisterCar: { screen: GetCarScreen },
  FuelDay: { screen: FuelDayScreen },
  Menu: { screen: MenuScreen },
});

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    AppNavigator.navigationOptions = {
      header: <Header />,
    };

    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
