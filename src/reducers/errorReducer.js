import {
  ERROR,
  ERROR_SERVING
} from '../actions/types';

const INITIAL_STATE = {
	error: true,
	errorServing: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case ERROR:
  		return {...state, error: action.payload}
  	case ERROR_SERVING:
  		return {...state, errorServing: action.payload}
    default:
      return state;
  }
}
