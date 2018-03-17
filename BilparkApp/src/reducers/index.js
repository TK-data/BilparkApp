import { combineReducers } from 'redux';
import nav from './navigation';
import auth from './auth';
import form from './form';
import { carFetchFailure, carFetchLoading, car } from './registerCar';

const AppReducer = combineReducers({
  nav,
  auth,
  form,
  carFetchFailure,
  carFetchLoading,
  car,
});

export default AppReducer;
