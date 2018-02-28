import {
  VERIFY_SUBMITTED
} from '../actions/types';

const INITIAL_STATE = {
	verifySubmitted: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case VERIFY_SUBMITTED:
      return {...state, verifySubmitted: action.payload}
    default:
      return state;
  }
}
