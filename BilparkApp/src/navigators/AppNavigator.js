import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/login/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import UserRegisterScreen from '../components/UserRegister/UserRegisterScreen';
import GetCarScreen from '../components/registerVehicle/GetCarScreen';
import FuelDayScreen from '../components/fuelDay/FuelDayScreen';
import MenuScreen from '../components/menu/MenuScreen';
import { addListener } from '../utils/redux';

export const AppNavigator = StackNavigator({
  Register: { screen: UserRegisterScreen },
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
