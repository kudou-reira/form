import { combineReducers } from 'redux';
import landingReducer from './landingReducer';
import restaurantReducer from './restaurantReducer';
import pageIndexReducer from './pageIndexReducer';
import dataReducer from './dataReducer';
import dishReducer from './dishReducer';
import errorReducer from './errorReducer';

export default combineReducers({
	landing: landingReducer,
	restaurant: restaurantReducer,
	pageIndex: pageIndexReducer,
	data: dataReducer,
	dish: dishReducer,
	error: errorReducer
});

