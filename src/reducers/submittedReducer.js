import {
  VERIFY_SUBMITTED
} from '../actions/types';

const initialState = {
	verifySubmitted: false
};

export default (state = initialState, action) => {
  switch (action.type) {
  	case VERIFY_SUBMITTED:
      return {...state, verifySubmitted: action.payload}
    default:
      return state;
  }
}
