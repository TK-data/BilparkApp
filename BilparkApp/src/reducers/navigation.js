import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Menu' }));
    break;
  case 'LOGOUT_SUCCESS':
    nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }));
    break;
  case 'ROUTE_COMPANY_SCREEN':
    nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'RegisterCompanyScreen' }));
    break;
  default:
    nextState = AppNavigator.router.getStateForAction(action, state);
    break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default nav;
