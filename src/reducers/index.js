import { combineReducers } from 'redux';
import landingReducer from './landingReducer';
import restaurantReducer from './restaurantReducer';
import pageIndexReducer from './pageIndexReducer';
import dataReducer from './dataReducer';
import errorReducer from './errorReducer';

export default combineReducers({
	landing: landingReducer,
	restaurant: restaurantReducer,
	pageIndex: pageIndexReducer,
	data: dataReducer,
	error: errorReducer
});

