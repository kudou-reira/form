import {
  ERROR,
  ERROR_SERVING
} from '../actions/types';

export const initialState = {
	error: true,
	errorServing: true
};

export default (state = initialState, action) => {
  switch (action.type) {
  	case ERROR:
  		return {...state, error: action.payload}
  	case ERROR_SERVING:
  		return {...state, errorServing: action.payload}
    default:
      return state;
  }
}
