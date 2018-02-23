import data from '../lib/dishes.json';

const INITIAL_STATE = {
	data: data
};

export default (state = INITIAL_STATE) => {
	return state;
}
