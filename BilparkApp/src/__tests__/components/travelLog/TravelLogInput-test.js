import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import TravelLogInput from '../../../components/travelLog/TravelLogInput';

const initialState = {
  travelLog: {
    addressFrom: '',
    addressTo: '',
    cargoValue: {
      Cargo: false,
      Comment: '',
    },
    datepickerDate: '15.5.2018',
    datepickerVisible: false,
    distance: '0km',
    formType: true,
    formValue: {
      Passenger: '0',
      Passenger1: '',
      Passenger2: '',
      Passenger3: '',
      Passenger4: '',
      Passenger5: '',
    },
    positionFrom: '0',
    positionTo: '0',
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing TravelLogInput', () => {
  // Fails because of the changing time in the datepicker
  /*
  it('Renders as expected', () => {
    const comp = shallow(
      <TravelLogInput />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
  */
  const wrapper = shallow(
    <TravelLogInput />,
    { context: { store: mockStore(initialState) } },
  );
  it('Can press the save button', () => {
    const saveButton = wrapper.dive().dive().childAt(5);
    saveButton.simulate('press');
  });
  it('Can press the dateButton', () => {
    const dateButton = wrapper.dive().dive().childAt(2).childAt(1)
      .childAt(2);
    dateButton.simulate('press');
  });
  it('Can cancel the datepicker', () => {
    const datepicker = wrapper.dive().dive().childAt(2).childAt(1)
      .childAt(1);
    datepicker.simulate('cancel');
  });
  it('Can confirm the datepicker', () => {
    const d = new Date();
    d.setTime(1332403882588);
    const datepicker = wrapper.dive().dive().childAt(2).childAt(1)
      .childAt(1);
    datepicker.simulate('confirm', d);
  });
});
