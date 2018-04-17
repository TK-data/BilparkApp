import { combineReducers } from 'redux';
import nav from './navigation';
import auth from './auth';
import { loginMail, loginOptions } from './form';
import { carFetchFailure, carFetchLoading, car } from './registerCar';
import { registerUserModalVisible, registerUserModalTransparent, options, values } from './registerUser';

const AppReducer = combineReducers({
  nav,
  auth,
  loginMail,
  loginOptions,
  carFetchFailure,
  carFetchLoading,
  car,
  registerUserModalVisible,
  registerUserModalTransparent,
  options,
  values,
});

export default AppReducer;
