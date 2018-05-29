import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import LoginStatusMessage from '../../components/LoginStatusMessage';

const initialState = {
  hasErrored: false,
  isLoading: true,
  auth: {
    hasErrored: false,
    isLoading: false,
    isLoggedIn: true,
    user: '{"UserID":111,"Email":"awkdnawpidn@aiwfaf.no","CompanyID":7,"CarID":82,"Address":"Oiabfoaiwbf","Fname":"Obafiobafiob","Lname":"Oabfoaib","FuelDay":0,"FuelTime":"12-00","FuelNotification":false,"createdAt":"2018-05-20T11:30:10.000Z","updatedAt":"2018-05-20T11:30:21.000Z"}',
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing LoginStatusMessage', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <LoginStatusMessage />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});
