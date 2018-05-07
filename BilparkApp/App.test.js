import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import App from './App';


const initialState = {
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


it('renders without crashing', () => {
  // const rendered = renderer.create(<App />).toJSON();
  // expect(rendered).toBeTruthy();
  const comp = shallow(
    <App />,
    { context: { store: mockStore(initialState) } },
  );
  expect(comp.dive()).toMatchSnapshot();
});
