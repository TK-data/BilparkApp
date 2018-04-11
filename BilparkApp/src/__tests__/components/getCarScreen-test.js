import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

// imported as a connected component!
import GetCarScreen from '../../components/registerVehicle/GetCarScreen';

const middlewares = []; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);

const initialState = {};

describe('Testing GetCarScreen', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <GetCarScreen />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('calls actions as expected when toggling switches', () => {
    const wrapper = shallow(
      <GetCarScreen />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
