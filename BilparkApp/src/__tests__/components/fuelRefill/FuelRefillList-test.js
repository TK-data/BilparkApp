import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import FuelRefillList from '../../../components/fuelRefill/FuelRefillList';

const initialState = {
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing FuelRefillList', () => {
  it('Needs to be tested', () => {
    expect(true).toBe(true);
  });
  /*
  it('Renders as expected', () => {
    const comp = shallow(
      <FuelRefillList />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
  */
});
