import LandingPage from '../components/landingPage';
import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { initialState as data } from '../reducers/dataReducer';
import { initialState as error } from '../reducers/errorReducer';
import { initialState as restaurant } from '../reducers/restaurantReducer';
import { initialState as landing } from '../reducers/landingReducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<LandingPage />', () => {
  it('renders with default props', () => {
  	const store = mockStore({landing, restaurant, error, data});
    const wrapper = shallow(
      <LandingPage store={store} />
    );
    // console.log("this is wrapper props in first test", wrapper.props());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  // enzyme can't attach to portal elements
  // it('changes meal time to breakfast if breakfast is selected', () => {
  // 	const store = mockStore({landing, restaurant, error, data});
  //   const wrapper = mount( <Provider store={store}><LandingPage /></Provider> );

  //   wrapper.find("DropdownButton").first().simulate('change', {eventKey: 'breakfast'});
  //   console.log("this is wrapper props", wrapper.props());

  //   // wrapper.props().selectMealtime('breakfast');
  //   // wrapper.update();
		// expect(wrapper.props().mealtime).toBe("----");
  // });
});


