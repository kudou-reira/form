import {
  SELECT_MEALTIME,
  SELECT_PEOPLE,
  VERIFY_LANDING
} from '../actions/types';

// export const initialState = {
//   hi: 'yes'
// }

export const initialState = {
	mealtime: '----',
	numberOfPeople: "----",
  verifyLanding: false
};

export default (state = initialState, action) => {
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
