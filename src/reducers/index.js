import { combineReducers } from 'redux';
import landingReducer from './landingReducer';
import pageIndexReducer from './pageIndexReducer';
import dataReducer from './dataReducer';

export default combineReducers({
	landing: landingReducer,
	pageIndex: pageIndexReducer,
	data: dataReducer
});

