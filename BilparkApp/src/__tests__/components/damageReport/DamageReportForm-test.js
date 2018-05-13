import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DamageReportForm from '../../../components/damageReport/DamageReportForm';

const initialState = {
  damageReportForm: {
    isLoading: false,
    hasErrored: false,
  },
  damageReportValues: {
    values: 'test',
  },
  auth: {
    car: 'testcar',
  },
  damageReportOptions: {
    formOptions: 'testoptions',
  },
  currentDamageReport: {
    Items: 'testItems',
  }
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing DamageReportForm', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <DamageReportForm />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});
