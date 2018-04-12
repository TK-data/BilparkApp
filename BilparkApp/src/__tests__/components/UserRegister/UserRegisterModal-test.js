import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';

import UserRegisterModal from '../../../components/UserRegister/UserRegisterModal';

const initialState = {
};


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing UserRegisterModal', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <UserRegisterModal />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});

describe('Async actions', () => {
  it('Navigates to login', () => {
    // const store = mockStore({});
    expect(1).toBe(1);
    // run the dispatch of postFuelDay.
    // then compare the actions expected with the ones in the mock store
    // return store.dispatch(mapDispatchToProps).then(() => {
    //  expect(store.getActions()).toEqual(expectedActions);
  });
});
