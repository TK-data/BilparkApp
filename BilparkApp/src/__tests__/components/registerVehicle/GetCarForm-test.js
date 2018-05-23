import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import GetCarForm from '../../../components/registerVehicle/GetCarForm';

const initialState = {
  hasErrored: false,
  isLoading: true,
  auth: {
    hasErrored: false,
    isLoading: false,
    user: 'user',
  },
  carFetch: {
    hasErrored: false,
    isLoading: false,
    car: '',
    isAccepted: false,
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing GetCarForm', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <GetCarForm />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});
