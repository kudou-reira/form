import {
  SELECT_MEALTIME,
  SELECT_PEOPLE,
  VERIFY_LANDING
} from '../actions/types';

const INITIAL_STATE = {
	mealtime: '----',
	numberOfPeople: "----",
  verifyLanding: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case SELECT_MEALTIME:
  		return {...state, mealtime: action.payload}
  	case SELECT_PEOPLE:
  		return {...state, numberOfPeople: action.payload}
    case VERIFY_LANDING:
      return {...state, verifyLanding: action.payload}
    default:
      return state;
  }
}
