import data from '../lib/dishes.json';

export const initialState = {
	data: data
};

export default (state = initialState) => {
	return state;
}
