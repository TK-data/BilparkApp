import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import MenuBox from '../../components/menu/MenuBox';

const initialState = {
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing menu boxes', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <MenuBox />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });

  const wrapper = shallow(
    <MenuBox />,
    { context: { store: mockStore(initialState) } },
  );

  it('Pressing the menubox button', () => {
    const render = wrapper.dive();
    console.log(render.debug());
    const submitButton = render.find('TouchableOpacity');
    submitButton.simulate('press');
  });
});
