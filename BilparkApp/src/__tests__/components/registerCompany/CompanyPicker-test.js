import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import CompanyPicker from '../../../components/registerCompany/CompanyPicker';

const initialState = {
  registerCompany: {
    companies: [{ CompanyID: 5, CompanyName: 'Bedrift1' }, { CompanyID: 8, CompanyName: 'Bedrift2' }],
    selectedCompany: 5,
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing FuelRefillScreen', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <CompanyPicker />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});
