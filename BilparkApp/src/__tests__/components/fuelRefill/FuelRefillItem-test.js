import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import FuelRefillItem from '../../../components/fuelRefill/FuelRefillItem';

const initialState = {
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing FuelRefillItem', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <FuelRefillItem />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});
