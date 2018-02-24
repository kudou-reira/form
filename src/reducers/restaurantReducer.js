import {
  SELECT_RESTAURANT,
  VERIFY_RESTAURANT
} from '../actions/types';

const INITIAL_STATE = {
	restaurant: '----',
  verifyRestaurant: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case SELECT_RESTAURANT:
  		return {...state, restaurant: action.payload}
    case VERIFY_RESTAURANT:
      return {...state, verifyRestaurant: action.payload}
    default:
      return state;
  }
}
