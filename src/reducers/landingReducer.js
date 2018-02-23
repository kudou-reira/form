import {
  SELECT_MEALTIME,
  SELECT_PEOPLE
} from '../actions/types';

const INITIAL_STATE = {
	mealtime: '----',
	numberOfPeople: 1
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case SELECT_MEALTIME:
  		return {...state, mealtime: action.payload}
  	case SELECT_PEOPLE:
  		return {...state, numberOfPeople: action.payload}
    default:
      return state;
  }
}
