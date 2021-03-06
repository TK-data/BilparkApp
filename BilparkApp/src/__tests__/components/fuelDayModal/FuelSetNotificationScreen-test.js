import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import FuelSetNotificationScreen from '../../../components/fuelDayModal/FuelSetNotificationScreen';

const initialState = {
  hasErrored: false,
  isLoading: true,
  auth: {
    hasErrored: false,
    isLoading: false,
    user: '{"UserID":111,"Email":"awkdnawpidn@aiwfaf.no","CompanyID":7,"CarID":82,"Address":"Oiabfoaiwbf","Fname":"Obafiobafiob","Lname":"Oabfoaib","FuelDay":0,"FuelTime":"12-00","FuelNotification":false,"createdAt":"2018-05-20T11:30:10.000Z","updatedAt":"2018-05-20T11:30:21.000Z"}',
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing FuelSetNotificationScreen', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <FuelSetNotificationScreen />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});
