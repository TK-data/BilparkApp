import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DamageReportScreen from '../../../components/damageReport/DamageReportScreen';

const initialState = {
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing DamageReportScreen', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <DamageReportScreen />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});
