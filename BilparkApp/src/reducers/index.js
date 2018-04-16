import { combineReducers } from 'redux';
import nav from './navigation';
import auth from './auth';
import form from './form';
import { carFetch } from './registerCar';
import { registerUserModalVisible, registerUserModalTransparent, options, values } from './registerUser';

const AppReducer = combineReducers({
  nav,
  auth,
  form,
  carFetch,
  registerUserModalVisible,
  registerUserModalTransparent,
  options,
  values,
});

export default AppReducer;
