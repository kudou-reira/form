import {
  PAGE_INDEX
} from '../actions/types';

const INITIAL_STATE = {
	page: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case PAGE_INDEX:
  		return {...state, page: action.payload}
    default:
      return state;
  }
}
