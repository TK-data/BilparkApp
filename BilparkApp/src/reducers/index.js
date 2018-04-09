import { combineReducers } from 'redux';
import nav from './navigation';
import auth from './auth';
import form from './form';
import { carFetchFailure, carFetchLoading, car } from './registerCar';
import { registerModalVisible, registerModalTransparent, options, values } from './registerUser';

const AppReducer = combineReducers({
  nav,
  auth,
  form,
  carFetchFailure,
  carFetchLoading,
  car,
  registerModalVisible,
  registerModalTransparent,
  options,
  values,
});

export default AppReducer;
