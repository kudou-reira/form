import {
  SELECT_RESTAURANT,
  VERIFY_RESTAURANT
} from '../actions/types';

export const initialState = {
	restaurant: '----',
  verifyRestaurant: false
};

export default (state = initialState, action) => {
  switch (action.type) {
  	case SELECT_RESTAURANT:
  		return {...state, restaurant: action.payload}
    case VERIFY_RESTAURANT:
      return {...state, verifyRestaurant: action.payload}
    default:
      return state;
  }
}
