import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

// imported as a connected component!
import CarForm from '../../../components/registerVehicle/CarForm';

const middlewares = []; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);

const initialState = {
  carFetch: {
    hasErrored: false,
    isLoading: false,
    car: '',
    isAccepted: false,
  },
};


describe('Testing GetCarScreen', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <CarForm />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
