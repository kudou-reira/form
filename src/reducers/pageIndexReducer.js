import {
  PAGE_INDEX
} from '../actions/types';

export const initialState = {
	page: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
  	case PAGE_INDEX:
  		return {...state, page: action.payload}
    default:
      return state;
  }
}
