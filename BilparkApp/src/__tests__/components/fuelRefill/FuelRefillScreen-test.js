import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import FuelRefillScreen from '../../../components/fuelRefill/FuelRefillScreen';

const initialState = {
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing FuelRefillScreen', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <FuelRefillScreen />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});
