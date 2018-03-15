import { combineReducers } from 'redux';
import nav from './navigation';
import auth from './auth';
import form from './form';

const AppReducer = combineReducers({
  nav,
  auth,
  form,
});

export default AppReducer;
