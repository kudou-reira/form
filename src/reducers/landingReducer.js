import {
  FETCH_MEALTIME
} from '../actions/types';

const INITIAL_STATE = {
	mealtime: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case FETCH_MEALTIME:
  		return {...state, mealtime: action.payload}
    default:
      return state;
  }
}
