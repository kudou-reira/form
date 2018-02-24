import {
  ERROR
} from '../actions/types';

const INITIAL_STATE = {
	error: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case ERROR:
  		return {...state, error: action.payload}
    default:
      return state;
  }
}
