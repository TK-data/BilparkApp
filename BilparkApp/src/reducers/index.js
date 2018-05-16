import { combineReducers } from 'redux';
import nav from './navigation';
import auth from './auth';
import { loginMail, loginOptions } from './form';
import form from './redux-form';
import { carFetch, carForm } from './registerCar';
import modals from './modals';
import { fuelRefill } from './fuelRefill';
import fuelRefillForm from './fuelRefillForm';
import { registerCompany } from './registerCompany';
import { registerUserModalVisible, registerUserModalTransparent, options, values } from './registerUser';
import { travelLog } from './travelLog';
import { damageReportForm, damageReportValues, damageReportOptions } from './damageReportForm';


const RootReducer = combineReducers({
  nav,
  auth,
  loginMail,
  loginOptions,
  form,
  carFetch,
  carForm,
  registerUserModalVisible,
  registerUserModalTransparent,
  options,
  values,
  fuelRefill,
  fuelRefillForm,
  modals,
  travelLog,
  damageReportForm,
  damageReportValues,
  damageReportOptions,
  registerCompany,
});

const AppReducer = (state, action) => {
  let nState = state;
  if (action.type === 'USER_LOGOUT') {
    nState = undefined;
  }

  return RootReducer(nState, action);
};

export default AppReducer;
