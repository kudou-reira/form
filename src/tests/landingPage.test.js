import LandingPage from '../components/landingPage';
import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState as LandingReducer } from '../reducers/landingReducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<LandingPage />', () => {

	// function mapStateToProps(state) {
	// 	return {
	// 		landing: state.landing,
	// 		data: state.data,
	// 		error: state.error,
	// 		restaurant: state.restaurant
	// 	}
	// }

	// console.log("this is map", mapStateToProps(reducers));

	console.log("this is landing!!", LandingReducer);


  it('renders with default props', () => {
    const store = mockStore(reducers);
    const wrapper = shallow(
      <LandingPage store={store} />
    );
    console.log("this is initialState", reducers);
    // console.log("this is wrapper props in first test", wrapper.props());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('changes meal time to breakfast if breakfast is selected', () => {
  	const store = mockStore(reducers);
    wrapper = mount( <Provider store={store}><LandingPage /></Provider> );
    // data is undefined, why?

    console.log("this is the store", store);

    // wrapper.find("#mealtime").simulate('change',{ target: { value: "breakfast" } });
    // console.log("this is wrapper instance", wrapper.props().selectMealtime('breakfast'));
    // wrapper.update();
    // console.log("this is wrapper instance", wrapper.props());
		// expect(wrapper.props().mealtime).toBe("breakfast");
  });
});


